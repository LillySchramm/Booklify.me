/* eslint-disable camelcase */
import { VolumeInfo } from '../models/volume.model';
import { BookScraper, CoverScrapeResult } from './scraper';
import { PrismaService } from 'src/prisma/prisma.service';
import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';
import { MetadataProvider } from '@prisma/client';
import * as dateParser from 'any-date-parser';
import * as config from 'config';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';

const BRIGHT_DATA_CONFIG = {
    format: 'json',
    country: 'DE',
    method: 'GET',
};

const MAX_ATTEMPTS = 3;

export class AmazonBookScraper implements BookScraper {
    private readonly logger = new LokiLogger(AmazonBookScraper.name);

    private readonly amazonBaseUrl = 'https://www.amazon.de';
    private readonly amazonSearchUrl = 'https://www.amazon.de/s?k=';

    private readonly brightDataUrl = 'https://api.brightdata.com/request';

    private brightDataApiKey: string;
    private brightDataZone: string;

    constructor(private readonly prisma: PrismaService) {
        this.brightDataApiKey = config.get('brightdata.key');
        this.brightDataZone = config.get('brightdata.zone');
    }

    isLongRunning(): boolean {
        return true;
    }

    private async _get(
        url: string,
    ): Promise<{ statusCode: number; body: string; rawResponse: string }> {
        const result = await gotScraping.post(this.brightDataUrl, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.brightDataApiKey}`,
            },
            json: {
                ...BRIGHT_DATA_CONFIG,
                zone: this.brightDataZone,
                url,
            },
        });

        const body = JSON.parse(result.body);

        return {
            statusCode: body.status_code || 200,
            body: body.body,
            rawResponse: result.body,
        };
    }

    private async get(
        url: string,
    ): Promise<{ statusCode: number; body: string; rawResponse: string }> {
        this.logger.debug(`Scraping ${url}...`);

        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            const result = await this._get(url);
            if (result.statusCode === 200) {
                this.logger.debug(
                    `Scraped ${url}! Status code: ${result.statusCode}.`,
                );
                return result;
            }
        }

        this.logger.error(`Failed to scrape ${url}!`);
        return {
            statusCode: 503,
            body: '-_-',
            rawResponse: '-_-',
        };
    }

    async searchBook(isbn: string): Promise<string | null> {
        const searchUrl = this.amazonSearchUrl + isbn;
        const response = await this.get(searchUrl);

        await this.prisma.metadataResponse.create({
            data: {
                isbn,
                provider: MetadataProvider.AMAZON,
                url: searchUrl,
                body: response.rawResponse,
                responseCode: response.statusCode,
            },
        });

        if (response.statusCode !== 200) {
            this.logger.error(
                `Amazon returned ${response.statusCode} for ISBN ${isbn}.`,
            );

            return null;
        }

        const $ = cheerio.load(response.body);
        const items = $('div[data-component-type="s-search-result"]');
        if (items.length === 0) {
            this.logger.error(`Amazon returned no results for ISBN ${isbn}.`);
            return null;
        }

        this.logger.debug(
            `Amazon returned ${items.length} results for ISBN ${isbn}.`,
        );

        const firstNotSponsoredResult = items
            .filter(
                (_, element) =>
                    !$(element).find('.puis-sponsored-label-text').length,
            )
            .first();
        const url =
            this.amazonBaseUrl + firstNotSponsoredResult.find('a').attr('href');

        return url;
    }

    async scrapeBookMetaData(isbn: string, retry = false): Promise<VolumeInfo> {
        const url = await this.searchBook(isbn);
        if (!url) {
            return {};
        }

        const response = await this.get(url);

        await this.prisma.metadataResponse.create({
            data: {
                isbn,
                provider: MetadataProvider.AMAZON,
                url,
                body: response.body,
                responseCode: response.statusCode || 0,
            },
        });

        if (response.statusCode !== 200) {
            this.logger.error(
                `Amazon returned ${response.statusCode} for product page of ISBN ${isbn}.`,
            );

            return {};
        }

        const $ = cheerio.load(response.body);

        const title = $('#productTitle').text().trim();
        const authors = $('#bylineInfo a:not(.showMoreLink)')
            .map((_, element) => {
                return $(element).text().trim();
            })
            .get();

        const isbn13 = $(
            '#rpi-attribute-book_details-isbn13 .rpi-attribute-value',
        )
            .text()
            .trim()
            .replaceAll(/-/g, '');

        const pagesRaw = $(
            '#rpi-attribute-book_details-fiona_pages .rpi-attribute-value',
        )
            .text()
            .trim();

        const pageNumbers = pagesRaw.match(/[\d\.]{1,}/g) || [];
        const pageCount =
            pageNumbers.length > 0 ? parseInt(pageNumbers[0]!) : undefined;

        const publisher = $(
            '#rpi-attribute-book_details-publisher .rpi-attribute-value',
        )
            .text()
            .trim();
        const publishedDateRaw = $(
            '#rpi-attribute-book_details-publication_date .rpi-attribute-value',
        )
            .text()
            .trim();
        const parseAttempt = dateParser.attempt(publishedDateRaw, 'en');
        let publishedDate: string | undefined = undefined;

        if (parseAttempt.year) {
            publishedDate = `${parseAttempt.year}-${parseAttempt.month}-${parseAttempt.day}`;
        }

        const seriesRaw = $('#seriesBulletWidget_feature_div').text().trim();
        let series: string | undefined = undefined;
        if (seriesRaw) {
            series = seriesRaw.split(/: (.+)?/, 2)[1];
        }

        if (isbn13 !== isbn) {
            this.logger.error(
                `Amazon did not return the a book with the same ISBN.`,
            );

            // Often, this is caused by amazon being stupid. Most of the time,
            // fetching the metadata again fixes it.
            return retry ? {} : await this.scrapeBookMetaData(isbn, true);
        }

        const cleanedUrl = url.split('/ref=')[0];

        return {
            authors,
            pageCount,
            printedPageCount: pageCount,
            publisher,
            publishedDate,
            title,
            series,
            amazonLink: cleanedUrl,
        };
    }

    // eslint-disable-next-line require-await
    async scrapeBookCover(): Promise<CoverScrapeResult[]> {
        return [];
    }

    checkConfig(): boolean {
        if (!this.brightDataApiKey || !this.brightDataZone) {
            this.logger.error(
                'BrightData credentials are not set. Please set them in the config. (https://brightdata.com)',
            );

            return false;
        }
        return true;
    }
}
