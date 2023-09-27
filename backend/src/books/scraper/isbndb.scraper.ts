import { gotScraping } from 'got-scraping';
import {
    IsbndbBook,
    IsbndbBookResponse,
    VolumeInfo,
} from '../models/volume.model';
import { BookScraper, CoverScrapeResult } from './scraper';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetadataProvider } from '@prisma/client';

export class IsbndbBookScraper implements BookScraper {
    private readonly logger = new Logger(IsbndbBookScraper.name);

    private isbndbApiBase = 'https://api2.isbndb.com/book/';

    constructor(
        private cacheManager: Cache,
        private readonly prisma: PrismaService,
    ) {}

    async scrapeBookMetaData(isbn: string): Promise<VolumeInfo> {
        const url = `${this.isbndbApiBase}${isbn}`;
        let book = await this.cacheManager.get<IsbndbBook | null>(
            `isbndb.${isbn}`,
        );

        if (book === undefined) {
            const isbndbBookResponse = await gotScraping.get(url, {
                headers: {
                    Authorization: this.getApiKey(),
                },

                timeout: {
                    request: 5000,
                },
            });

            await this.prisma.metadataResponse.create({
                data: {
                    isbn,
                    provider: MetadataProvider.ISBNDB,
                    url,
                    body: isbndbBookResponse.body,
                    responseCode: isbndbBookResponse.statusCode,
                },
            });

            if (isbndbBookResponse.statusCode !== 200) {
                this.logger.error(
                    `ISBNDB API returned ${isbndbBookResponse.statusCode} for ISBN ${isbn}.`,
                );

                await this.cacheManager.set(
                    `isbndb.${isbn}`,
                    null,
                    60 * 60 * 1000,
                );

                return {};
            }

            const bookResponse = JSON.parse(
                isbndbBookResponse.body,
            ) as IsbndbBookResponse;

            book = bookResponse.book;

            await this.cacheManager.set(`isbndb.${isbn}`, book, 60 * 60 * 1000);
        }

        return book === null ? {} : this.volumeInfoFromIsbndbBook(book);
    }

    private volumeInfoFromIsbndbBook(book: IsbndbBook): VolumeInfo {
        return {
            title: book.title,
            subtitle: book.title_long,
            publisher: book.publisher,
            pageCount: book.pages,
            printedPageCount: book.pages,
            publishedDate: book.date_published,
            authors: book.authors,
            description: book.synopsis,
            imageLinks: {
                isbndb: book.image,
            },
        };
    }

    // eslint-disable-next-line require-await
    async scrapeBookCover(isbn: string): Promise<CoverScrapeResult[]> {
        const book = await this.scrapeBookMetaData(isbn);

        if (!book.imageLinks || !book.imageLinks.isbndb) {
            return [{ buffer: null, url: '' }];
        }

        const isbndbImage = await gotScraping.get(book.imageLinks.isbndb);
        if (isbndbImage.statusCode === 200) {
            return [
                {
                    buffer: isbndbImage.rawBody,
                    url: book.imageLinks.isbndb,
                },
            ];
        }
        this.logger.error(
            `ISBNDB Image API returned ${isbndbImage.statusCode} for Cover of ISBN ${isbn}.`,
        );

        return [{ buffer: null, url: '' }];
    }

    getApiKey(): string {
        return config.get<string>('isbndb.key');
    }

    checkConfig(): boolean {
        const key = this.getApiKey();
        if (!key) {
            this.logger.error(
                'ISBNDB API key is not set. Please set it in the config if you intend to use the ISBNDB API Services. (https://isbndb.com/isbn-database)',
            );

            return false;
        }

        return true;
    }
}
