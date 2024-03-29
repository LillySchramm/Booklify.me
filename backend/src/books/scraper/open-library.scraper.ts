import { gotScraping, Response } from 'got-scraping';
import { OpenLibraryBookVolume, VolumeInfo } from '../models/volume.model';
import { BookScraper, CoverScrapeResult } from './scraper';
import { PrismaService } from 'src/prisma/prisma.service';
import { MetadataProvider } from '@prisma/client';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';

export class OpenLibraryBookScraper implements BookScraper {
    private readonly logger = new LokiLogger(OpenLibraryBookScraper.name);

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

        let description: string | undefined;
        if (typeof openLibraryBookData.description === 'string') {
            description = openLibraryBookData.description;
        } else if (
            typeof openLibraryBookData.description === 'object' &&
            openLibraryBookData.description.type === '/type/text'
        ) {
            description = openLibraryBookData.description.value;
        }

        const book: VolumeInfo = {
            title: openLibraryBookData.title,
            subtitle: openLibraryBookData.subtitle,
            description: description,
            publisher: openLibraryBookData.publishers?.[0],
            pageCount: openLibraryBookData.number_of_pages,
            printedPageCount: openLibraryBookData.number_of_pages,
            publishedDate: openLibraryBookData.publish_date,
        };

        return book;
    }

    async scrapeBookCover(isbn: string): Promise<CoverScrapeResult[]> {
        const url = `${this.openLibraryCoverBase}/${isbn}-L.jpg?default=false`;

        let openLibraryBookResponse: Response<string> | undefined;
        try {
            openLibraryBookResponse = await gotScraping.get(url, {
                timeout: {
                    request: 5000,
                },
            });
        } catch (e) {
            this.logger.error(
                `Open Library Cover API Request for ISBN ${isbn} failed: ${e}`,
            );
        }

        if (!openLibraryBookResponse) {
            return [{ buffer: null, url: '' }];
        }

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
