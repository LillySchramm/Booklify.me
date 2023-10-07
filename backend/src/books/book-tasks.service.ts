import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BooksService } from './books.service';
import { BookGroupingService } from 'src/book-groups/bookGrouping.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BookTasksService {
    private readonly logger = new Logger(BookTasksService.name);

    private infoCrawlInProgress = false;

    constructor(
        private bookService: BooksService,
        private bookGrouping: BookGroupingService,
        private userService: UsersService,
    ) {}

    @Cron('*/5 * * * * *')
    async recrawlCover() {
        const book = await this.bookService.getOneWithRecrawlCoverFlag();
        if (!book) return;

        this.logger.log(`Recrawling cover for book ${book.isbn}...`);

        await this.bookService.scrapeBookCover(book.isbn);
        await this.bookService.setRecrawlCoverFlag(book.isbn, false);

        this.logger.log(`Recrawled cover for book ${book.isbn}!`);
    }

    @Cron('*/5 * * * * *')
    async updateOutdatedGrouping() {
        const user = await this.userService.getUserWithOutdatedGroupingFlag();
        if (!user) return;

        this.logger.log(`Updating grouping for user ${user.id}...`);

        await this.bookGrouping.groupBooksOfUser(user.id);

        this.logger.log(`Updated grouping for user ${user.id}!`);
    }

    @Cron('*/5 * * * * *')
    async recrawlInfo() {
        if (this.infoCrawlInProgress) return;

        const book = await this.bookService.getOneWithRecrawlInfoFlag();
        if (!book) return;

        this.infoCrawlInProgress = true;

        this.logger.log(`Recrawling info for book ${book.isbn}...`);

        await this.bookService.scrapeBookMetaData(book.isbn, true);
        await this.bookService.setRecrawlInfoFlag(book.isbn, false);

        this.logger.log(`Recrawled info for book ${book.isbn}!`);
        this.infoCrawlInProgress = false;
    }

    @Cron('0 0 * * * *')
    async tryFindCover() {
        const books = await this.bookService.getAllWithoutCover();
        if (!books) return;

        const book = books[Math.floor(Math.random() * books.length)];

        this.logger.log(
            `Recrawling cover for book ${book.isbn} because it does not have a cover...`,
        );

        await this.bookService.scrapeBookCover(book.isbn);

        this.logger.log(`Recrawled cover for book ${book.isbn}!`);
    }
}
