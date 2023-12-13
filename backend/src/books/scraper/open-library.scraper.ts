import { gotScraping } from 'got-scraping';
import { OpenLibraryBookVolume, VolumeInfo } from '../models/volume.model';
import { BookScraper, CoverScrapeResult } from './scraper';
import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetadataProvider } from '@prisma/client';

export class OpenLibraryBookScraper implements BookScraper {
    private readonly logger = new Logger(OpenLibraryBookScraper.name);

    private openLibraryApiBase = 'https://openlibrary.org/isbn';
    private openLibraryCoverBase = 'https://covers.openlibrary.org/b/isbn';

    constructor(private readonly prisma: PrismaService) {}
    isLongRunning(): boolean {
        return false;
    }

    async scrapeBookMetaData(isbn: string): Promise<VolumeInfo> {
        const url = `${this.openLibraryApiBase}/${isbn}.json`;
        const openLibraryBookResponse = await gotScraping.get(url);

        await this.prisma.metadataResponse.create({
            data: {
                isbn,
                provider: MetadataProvider.OPEN_LIBRARY,
                url,
                body: openLibraryBookResponse.body,
                responseCode: openLibraryBookResponse.statusCode,
            },
        });

        if (openLibraryBookResponse.statusCode !== 200) {
            this.logger.error(
                `Open Library API returned ${openLibraryBookResponse.statusCode} for ISBN ${isbn}.`,
            );

            return {};
        }

        const openLibraryBookData = JSON.parse(
            openLibraryBookResponse.body,
        ) as OpenLibraryBookVolume;

        const book: VolumeInfo = {
            title: openLibraryBookData.title,
            subtitle: openLibraryBookData.subtitle,
            description: openLibraryBookData.description,
            publisher: openLibraryBookData.publishers?.[0],
            pageCount: openLibraryBookData.number_of_pages,
            printedPageCount: openLibraryBookData.number_of_pages,
            publishedDate: openLibraryBookData.publish_date,
        };

        return book;
    }

    async scrapeBookCover(isbn: string): Promise<CoverScrapeResult[]> {
        const url = `${this.openLibraryCoverBase}/${isbn}-L.jpg?default=false`;
        const openLibraryBookResponse = await gotScraping.get(url, {
            timeout: {
                request: 5000,
            },
        });

        if (openLibraryBookResponse.statusCode !== 200) {
            this.logger.error(
                `Open Library Cover API returned ${openLibraryBookResponse.statusCode} for ISBN ${isbn}.`,
            );

            return [{ buffer: null, url: '' }];
        }

        return [
            {
                buffer: openLibraryBookResponse.rawBody,
                url,
            },
        ];
    }

    checkConfig(): boolean {
        return true;
    }
}
