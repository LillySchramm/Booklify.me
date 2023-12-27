import { Inject, Injectable } from '@nestjs/common';
import { VolumeInfo } from '../models/volume.model';
import { GoogleBookScraper } from './google.scraper';
import { IsbndbBookScraper } from './isbndb.scraper';
import { OpenLibraryBookScraper } from './open-library.scraper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { AmazonBookScraper } from './amazon.scraper';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';

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

    checkConfig(): boolean;
    isLongRunning(): boolean;
}

@Injectable()
export class Scraper implements BookScraper {
    private readonly logger = new LokiLogger(Scraper.name);

    private metadataScrapers: BookScraper[] = [];
    private coverScrapers: BookScraper[] = [];

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly prisma: PrismaService,
    ) {
        const googleBookScraper = new GoogleBookScraper(prisma);
        const isbndbBookScraper = new IsbndbBookScraper(cacheManager, prisma);
        const openLibraryBookScraper = new OpenLibraryBookScraper(prisma);
        const amazonBookScraper = new AmazonBookScraper(prisma);

        this.coverScrapers.push(openLibraryBookScraper);
        this.coverScrapers.push(isbndbBookScraper);
        this.coverScrapers.push(googleBookScraper);

        this.metadataScrapers.push(googleBookScraper);
        this.metadataScrapers.push(openLibraryBookScraper);
        this.metadataScrapers.push(isbndbBookScraper);
        this.metadataScrapers.push(amazonBookScraper);

        this.metadataScrapers = this.metadataScrapers.filter((scraper) =>
            scraper.checkConfig(),
        );
        this.coverScrapers = this.coverScrapers.filter((scraper) =>
            scraper.checkConfig(),
        );

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
    isLongRunning(): boolean {
        return false;
    }

    async scrapeBookMetaData(
        isbn: string,
        allowLongruning: boolean = false,
    ): Promise<VolumeInfo> {
        let volume: VolumeInfo = {};

        for await (const scraper of this.metadataScrapers) {
            if (!allowLongruning && scraper.isLongRunning()) {
                volume.incomplete = true;
                continue;
            }

            const volumeFromScraper = await scraper.scrapeBookMetaData(isbn);
            if (volumeFromScraper) {
                volume = this.merge(volume, volumeFromScraper);
            }
        }

        return volume;
    }

    async scrapeBookCover(
        isbn: string,
        volume?: VolumeInfo,
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

    private numbersInString(str: string): number {
        return (str.match(/[\d\.]{1,}/g) || []).length;
    }

    private merge(obj1: VolumeInfo, obj2: VolumeInfo): VolumeInfo {
        if (obj1.title && obj2.title) {
            // Number of digits in title is a good indicator of which title is more complete
            // Also very useful for grouping.
            const title1Count = this.numbersInString(obj1.title);
            const title2Count = this.numbersInString(obj2.title);

            if (title2Count === 0) {
                obj2.title = obj1.title;
            } else if (
                title1Count &&
                obj2.title.length > obj1.title.length * 1.5
            ) {
                obj2.title = obj1.title;
            }
        }

        if (obj1.authors && obj2.authors) {
            obj1.authors = obj2.authors;
        }

        return Object.assign(obj1, this.definedProps<VolumeInfo>(obj2));
    }

    private definedProps<T extends object>(obj: T): T {
        return Object.fromEntries(
            Object.entries(obj).filter(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ([_, v]) =>
                    v !== undefined &&
                    v !== null &&
                    v !== '' &&
                    v !== 0 &&
                    v !== false &&
                    v.length !== 0,
            ),
        ) as T;
    }

    checkConfig(): boolean {
        return true;
    }
}
