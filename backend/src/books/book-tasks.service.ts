import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BooksService } from './books.service';

@Injectable()
export class BookTasksService {
    private readonly logger = new Logger(BookTasksService.name);

    constructor(private bookService: BooksService) {}

    @Cron('*/5 * * * * *')
    async recrawlCover() {
        const book = await this.bookService.getOneWithRecrawlCoverFlag();
        if (!book) return;

        this.logger.log(`Recrawling cover for book ${book.isbn}...`);

        await this.bookService.scrapeBookCover(book.isbn);
        await this.bookService.setRecrawlCoverFlag(book.isbn, false);
        this.logger.log(`Recrawled cover for book ${book.isbn}!`);
    }
}
