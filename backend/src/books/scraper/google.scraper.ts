import { gotScraping } from 'got-scraping';
import {
    GoogleBookResponse,
    GoogleVolume,
    VolumeInfo,
} from '../models/volume.model';
import { BookScraper, CoverScrapeResult } from './scraper';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetadataProvider } from '@prisma/client';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';

export class GoogleBookScraper implements BookScraper {
    private readonly logger = new LokiLogger(GoogleBookScraper.name);

    private googleBooksApiBase = 'https://www.googleapis.com/books/v1/volumes';

    constructor(private readonly prisma: PrismaService) {}
    isLongRunning(): boolean {
        return false;
    }

    async scrapeBookMetaData(isbn: string): Promise<VolumeInfo> {
        const url = `${this.googleBooksApiBase}?q=isbn:${isbn}`;
        const googleBookResponse = await gotScraping.get(url);

        await this.prisma.metadataResponse.create({
            data: {
                isbn,
                provider: MetadataProvider.GOOGLE_BOOKS,
                url,
                body: googleBookResponse.body,
                responseCode: googleBookResponse.statusCode,
            },
        });

        const googleBookData: GoogleBookResponse = JSON.parse(
            googleBookResponse.body,
        );

        if (
            googleBookResponse.statusCode !== 200 ||
            googleBookData.totalItems === 0
        ) {
            this.logger.error(
                `Google Books API returned ${googleBookResponse.statusCode} and ${googleBookData.totalItems} Items for ISBN ${isbn}.`,
            );

            return {};
        }

        const book: GoogleVolume = await gotScraping
            .get(googleBookData.items[0].selfLink)
            .json();

        return book.volumeInfo;
    }

    async scrapeBookCover(
        isbn: string,
        volume?: VolumeInfo,
    ): Promise<CoverScrapeResult[]> {
        if (!volume) {
            volume = await this.scrapeBookMetaData(isbn);
        }

        if (!volume.imageLinks || !volume.imageLinks.thumbnail) {
            const googleBookResponseFromTitle: GoogleBookResponse =
                await gotScraping
                    .get(this.googleBooksApiBase + '?q=title:' + volume.title)
                    .json();

            const bookWithSameTitle = googleBookResponseFromTitle.items.find(
                (book) => book.volumeInfo.title!.startsWith(volume!.title!),
            );

            if (
                !bookWithSameTitle ||
                !bookWithSameTitle.volumeInfo.imageLinks ||
                !bookWithSameTitle.volumeInfo.imageLinks.thumbnail
            ) {
                return [{ buffer: null, url: '' }];
            }

            volume.imageLinks = bookWithSameTitle.volumeInfo.imageLinks;
        }

        const googleImage = await gotScraping.get(volume.imageLinks.thumbnail!);
        if (googleImage.statusCode === 200) {
            return [
                {
                    buffer: googleImage.rawBody,
                    url: volume.imageLinks.thumbnail!,
                },
            ];
        }

        return [{ buffer: null, url: volume.imageLinks.thumbnail! }];
    }

    checkConfig(): boolean {
        return true;
    }
}
