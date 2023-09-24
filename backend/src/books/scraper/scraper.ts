import { Injectable, Logger } from '@nestjs/common';
import { VolumeInfo } from '../models/volume.model';
import { GoogleBookScraper } from './google.scraper';
import { IsbndbBookScraper } from './isbndb.scraper';
import { OpenLibraryBookScraper } from './open-library.scraper';

export interface CoverScrapeResult {
    buffer: Buffer | null;
    url: string;
}

export interface BookScraper {
    scrapeBookMetaData(isbn: string): Promise<VolumeInfo>;
    scrapeBookCover(
        isbn: string,
        volume?: VolumeInfo,
    ): Promise<CoverScrapeResult[]>;
}

@Injectable()
export class Scraper implements BookScraper {
    private readonly logger = new Logger(Scraper.name);

    private readonly metadataScrapers: BookScraper[] = [];
    private readonly coverScrapers: BookScraper[] = [];

    constructor() {
        const googleBookScraper = new GoogleBookScraper();
        const isbndbBookScraper = new IsbndbBookScraper();
        const openLibraryBookScraper = new OpenLibraryBookScraper();

        this.coverScrapers.push(openLibraryBookScraper);
        this.coverScrapers.push(isbndbBookScraper);
        this.coverScrapers.push(googleBookScraper);

        this.metadataScrapers.push(googleBookScraper);
        this.metadataScrapers.push(openLibraryBookScraper);

        this.logger.debug(
            `Initialized ${this.metadataScrapers.length} metadata scrapers and ${this.coverScrapers.length} cover scrapers.`,
        );
        this.logger.debug(
            `Metadata scrapers: ${this.metadataScrapers
                .map((scraper) => scraper.constructor.name)
                .join(', ')}`,
        );
        this.logger.debug(
            `Cover scrapers: ${this.coverScrapers
                .map((scraper) => scraper.constructor.name)
                .join(', ')}`,
        );
    }

    async scrapeBookMetaData(isbn: string): Promise<VolumeInfo> {
        let volume: VolumeInfo = {};

        for await (const scraper of this.metadataScrapers) {
            const volumeFromScraper = await scraper.scrapeBookMetaData(isbn);
            volume = this.merge(volume, volumeFromScraper);
        }

        return volume;
    }

    async scrapeBookCover(
        isbn: string,
        volume: VolumeInfo,
    ): Promise<CoverScrapeResult[]> {
        const coverScrapeResults: CoverScrapeResult[] = [];

        for await (const scraper of this.coverScrapers) {
            const coverScrapeResult = await scraper.scrapeBookCover(
                isbn,
                volume,
            );

            coverScrapeResults.push(...coverScrapeResult);
        }

        return coverScrapeResults;
    }

    private merge<T extends object>(obj1: T, obj2: T): T {
        return Object.assign(obj1, this.definedProps<T>(obj2));
    }

    private definedProps<T extends object>(obj: T): T {
        return Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(obj).filter(([_, v]) => v !== undefined),
        ) as T;
    }
}
