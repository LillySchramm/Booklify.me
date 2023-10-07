import { VolumeInfo } from '../models/volume.model';
import { BookScraper, CoverScrapeResult } from './scraper';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Got, gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';
import { MetadataProvider } from '@prisma/client';
import * as dateParser from 'any-date-parser';

export class AmazonBookScraper implements BookScraper {
    private readonly logger = new Logger(AmazonBookScraper.name);

    private readonly amazonBaseUrl = 'https://www.amazon.de';
    private readonly amazonSearchUrl = 'https://www.amazon.de/s?k=';

    private readonly got = this.prepareGot();

    constructor(private readonly prisma: PrismaService) {}

    private prepareGot(): Got {
        const got = gotScraping.extend({
            headers: {
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                    '(KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
                'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            },
        });

        return got;
    }

    async searchBook(isbn: string): Promise<string | null> {
        const searchUrl = this.amazonSearchUrl + isbn;
        const response = await this.got.get(searchUrl);

        await this.prisma.metadataResponse.create({
            data: {
                isbn,
                provider: MetadataProvider.AMAZON,
                url: searchUrl,
                body: response.body,
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

    async scrapeBookMetaData(isbn: string): Promise<VolumeInfo> {
        const url = await this.searchBook(isbn);
        if (!url) {
            return {};
        }

        const response = await this.got.get(url);

        await this.prisma.metadataResponse.create({
            data: {
                isbn,
                provider: MetadataProvider.AMAZON,
                url,
                body: response.body,
                responseCode: response.statusCode,
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

            return {};
        }

        return {
            authors,
            pageCount,
            printedPageCount: pageCount,
            publisher,
            publishedDate,
            title,
        };
    }

    // eslint-disable-next-line require-await
    async scrapeBookCover(): Promise<CoverScrapeResult[]> {
        return [];
    }

    checkConfig(): boolean {
        return true;
    }
}
