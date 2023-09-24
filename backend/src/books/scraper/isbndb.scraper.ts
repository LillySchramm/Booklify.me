import { gotScraping } from 'got-scraping';
import { VolumeInfo } from '../models/volume.model';
import { BookScraper, CoverScrapeResult } from './scraper';
import { Logger } from '@nestjs/common';

export class IsbndbBookScraper implements BookScraper {
    private readonly logger = new Logger(IsbndbBookScraper.name);

    private isbndbCoverBase = 'https://images.isbndb.com/covers';

    // eslint-disable-next-line require-await, @typescript-eslint/no-unused-vars
    async scrapeBookMetaData(_isbn: string): Promise<VolumeInfo> {
        return {};
    }

    async scrapeBookCover(isbn: string): Promise<CoverScrapeResult[]> {
        const isbndbUrl = `${this.isbndbCoverBase}/${isbn.substring(
            isbn.length - 4,
            isbn.length - 2,
        )}/${isbn.substring(isbn.length - 2, isbn.length)}/${isbn}.jpg`;

        const isbndbImage = await gotScraping.get(isbndbUrl);
        if (isbndbImage.statusCode === 200) {
            return [{ buffer: isbndbImage.rawBody, url: isbndbUrl }];
        }

        return [{ buffer: null, url: isbndbUrl }];
    }
}
