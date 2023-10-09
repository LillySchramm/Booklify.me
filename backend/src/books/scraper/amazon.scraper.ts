/* eslint-disable camelcase */
import { VolumeInfo } from '../models/volume.model';
import { BookScraper, CoverScrapeResult } from './scraper';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';
import { MetadataProvider } from '@prisma/client';
import * as dateParser from 'any-date-parser';
import * as config from 'config';

const GEONODE_CONFIG = {
    js_render: false,
    is_json_response: false,
    block_resources: true,
    response_format: 'json',
    mode: 'documentLoaded',
    device_type: 'desktop',
    country_code: 'de',
    HTMLMinifier: { useMinifier: true },
    proxy: {
        useOnlyResidential: true,
    },
};

const MAX_ATTEMPTS = 3;

export class AmazonBookScraper implements BookScraper {
    private readonly logger = new Logger(AmazonBookScraper.name);

    private readonly amazonBaseUrl = 'https://www.amazon.de';
    private readonly amazonSearchUrl = 'https://www.amazon.de/s?k=';

    private readonly geoNodeUrl =
        'https://scraper.geonode.com/api/scraper/scrape/realtime';

    private geoNodeUsername: string;
    private geoNodePassword: string;

    constructor(private readonly prisma: PrismaService) {
        this.geoNodeUsername = config.get('geonode.username');
        this.geoNodePassword = config.get('geonode.password');
    }

    private async _get(
        url: string,
    ): Promise<{ statusCode: number; body: string; rawResponse: string }> {
        const result = await gotScraping.post(this.geoNodeUrl, {
            username: this.geoNodeUsername,
            password: this.geoNodePassword,
            json: {
                url,
                configurations: GEONODE_CONFIG,
            },
        });

        const body = JSON.parse(result.body);

        return {
            statusCode: body.statusCode || 200,
            body: body.html,
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

        const firstResult = items.first();
        const url = this.amazonBaseUrl + firstResult.find('a').attr('href');

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
        const authors = $('#bylineInfo a')
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

        return {
            authors,
            pageCount,
            printedPageCount: pageCount,
            publisher,
            publishedDate,
            title,
            series,
        };
    }

    // eslint-disable-next-line require-await
    async scrapeBookCover(): Promise<CoverScrapeResult[]> {
        return [];
    }

    checkConfig(): boolean {
        if (!this.geoNodeUsername || !this.geoNodePassword) {
            this.logger.error(
                'Geonode credentials are not set. Please set them in the config. (https://geonode.com/)',
            );

            return false;
        }
        return true;
    }
}
