import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import {
    Author,
    Book,
    BookStatus,
    OwnershipStatus,
    Publisher,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookGroupsService } from './bookGroups.service';
import * as isbn from 'isbn3';
import { UsersService } from 'src/users/users.service';

type BookWithPublisherAndAuthors = Book & {
    publisher: Publisher | null;
    authors: Author[];
    OwnershipStatus: OwnershipStatus[];
};

export const GROUPING_VERSION = 1;

@Injectable()
export class BookGroupingService {
    private readonly logger = new Logger(BookGroupingService.name);

    private readonly BLACKLISTED_CHUNKS = [
        'vol.',
        'band',
        '-',
        '(finale)',
        'part',
    ];
    private readonly BLACKLISTED_ENDING_CHARACTERS = [','];

    constructor(
        private prisma: PrismaService,
        private bookGroup: BookGroupsService,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
    ) {}

    private async getAllRelevantBooksOfUser(
        userId: string,
    ): Promise<BookWithPublisherAndAuthors[]> {
        const books: BookWithPublisherAndAuthors[] =
            await this.prisma.book.findMany({
                where: {
                    OwnershipStatus: {
                        some: { userId, status: BookStatus.OWNED },
                    },
                },
                include: {
                    authors: true,
                    publisher: true,
                    OwnershipStatus: { where: { userId } },
                },
            });

        return books;
    }

    processMapper(
        groupedBooks: Map<string, BookWithPublisherAndAuthors[]>,
        mapperFunction: (book: BookWithPublisherAndAuthors) => string,
    ): Map<string, BookWithPublisherAndAuthors[]> {
        const ungroupedBooks = groupedBooks.get('');
        groupedBooks.set('', []);

        for (const book of ungroupedBooks || []) {
            const bookKey = mapperFunction(book);
            if (!groupedBooks.has(bookKey)) {
                groupedBooks.set(bookKey, []);
            }
            groupedBooks.get(bookKey)!.push(book);
        }

        return groupedBooks;
    }

    async groupBooksOfUser(userId: string, force: boolean = false) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId },
            include: { UserFlags: true },
        });
        if (!user || !user.UserFlags) return;

        if (
            !force &&
            user.UserFlags.lastAppliedGrouperVersion >= GROUPING_VERSION
        )
            return;

        this.logger.log(`Grouping books of user ${userId}... Forced: ${force}`);

        const books = await this.getAllRelevantBooksOfUser(userId);

        let groupedBooks = new Map<string, BookWithPublisherAndAuthors[]>();
        groupedBooks.set('', books);

        groupedBooks = this.processMapper(
            groupedBooks,
            this.getSeriesNameOfBookByVolumeNumber.bind(this),
        );

        groupedBooks = this.processMapper(groupedBooks, (book) =>
            this.getSeriesNameOfBookByExactMatch(
                book,
                Array.from(groupedBooks.keys()),
            ),
        );

        const ungroupedBookTitles = groupedBooks
            .get('')!
            .map((book) => book.title || '');

        groupedBooks = this.processMapper(groupedBooks, (book) =>
            this.getSeriesNameOfBookByMultipleWithSameName(
                book,
                ungroupedBookTitles,
            ),
        );

        groupedBooks = this.processMapper(groupedBooks, (book) =>
            this.getSeriesNameOfBookByContainsFoundSeries(
                book,
                Array.from(groupedBooks.keys()),
                groupedBooks,
            ),
        );

        await this.saveBookGroupMap(groupedBooks, userId);
    }

    private async saveBookGroupMap(
        groupedBooks: Map<string, BookWithPublisherAndAuthors[]>,
        userId: string,
    ) {
        const bookGroups =
            await this.bookGroup.getAllBookGroupsOfUserWithOwnershipStatus(
                userId,
            );
        const bookGroupNames = new Map<string, string>(
            bookGroups.map((bookGroup) => [bookGroup.name, bookGroup.id]),
        );
        const bookGroupItems = new Map<string, string[]>(
            bookGroups.map((bookGroup) => [
                bookGroup.id,
                bookGroup.OwnershipStatus.map(
                    (ownershipStatus) => ownershipStatus.bookIsbn,
                ),
            ]),
        );
        const allUnassignedBooks =
            await this.bookGroup.getAllUnassignedBooksOfUser(userId);
        const allUnassignedBookIsbns = allUnassignedBooks.map(
            (ownershipStatus) => ownershipStatus.bookIsbn,
        );

        for await (const [bookGroupName, books] of groupedBooks) {
            if (!bookGroupName) {
                for await (const book of books) {
                    if (allUnassignedBookIsbns.includes(book.isbn)) continue;

                    await this.prisma.ownershipStatus.update({
                        where: {
                            // eslint-disable-next-line camelcase
                            userId_bookIsbn: { userId, bookIsbn: book.isbn },
                        },
                        data: { bookGroupId: null },
                    });
                }
                continue;
            }

            if (!bookGroupNames.has(bookGroupName)) {
                const newBookGroup = await this.bookGroup.createBookGroup(
                    bookGroupName,
                    userId,
                );
                bookGroupNames.set(newBookGroup.name, newBookGroup.id);
            }

            const bookGroupId = bookGroupNames.get(bookGroupName)!;
            const bookGroupItemIsbns = bookGroupItems.get(bookGroupId) || [];
            for await (const book of books) {
                if (bookGroupItemIsbns.includes(book.isbn)) continue;

                await this.prisma.ownershipStatus.update({
                    // eslint-disable-next-line camelcase
                    where: { userId_bookIsbn: { userId, bookIsbn: book.isbn } },
                    data: { bookGroupId },
                });
            }
        }

        await this.bookGroup.deleteEmptyBookGroupsOfUser(userId);
        await this.userService.updateUserGroupingVersionFlag(
            userId,
            GROUPING_VERSION,
        );
    }

    /**
        Tries to determine the series name by looking at the title of the book
        and looking for patterns that indicate that the book is part of a series. (e.g. "Vol. 1")
     */
    private getSeriesNameOfBookByVolumeNumber(
        book: BookWithPublisherAndAuthors,
    ): string {
        if (!book.title) return '';

        let titleChunks = book.title.split(' ');
        titleChunks = titleChunks.filter(
            (chunk) => !this.BLACKLISTED_CHUNKS.includes(chunk.toLowerCase()),
        );
        const titleWithoutBlacklistedChunks = titleChunks.join(' ');

        const numbers = titleChunks.filter((chunk) =>
            this.isStringNumeric(chunk),
        );
        titleChunks = titleChunks.filter(
            (chunk) => !this.isStringNumeric(chunk),
        );

        const titleEndsWithNumber =
            numbers.length &&
            titleWithoutBlacklistedChunks.endsWith(numbers[numbers.length - 1]);
        const titleEndsWithBlacklistedCharacter =
            this.BLACKLISTED_ENDING_CHARACTERS.includes(
                titleChunks[titleChunks.length - 1].at(-1) || '',
            );

        if (
            titleChunks.length &&
            titleEndsWithNumber &&
            !titleEndsWithBlacklistedCharacter
        )
            return titleChunks.join(' ');

        return '';
    }

    /**
     * Tries to determine the series name by looking for an exact match of
     * the book title with the series names of the other books.
     */
    private getSeriesNameOfBookByExactMatch(
        book: Book,
        currentSeriesNames: string[],
    ): string {
        if (book.title === null) return '';

        return (
            currentSeriesNames.find(
                (seriesName) =>
                    seriesName.toLowerCase() === book.title!.toLowerCase(),
            ) || ''
        );
    }

    /**
     * Tries to determine the series name by looking for an found series name
     * which contains the book title and has the same publisher.
     */
    private getSeriesNameOfBookByContainsFoundSeries(
        book: Book,
        currentSeriesNames: string[],
        groupedBooks: Map<string, BookWithPublisherAndAuthors[]>,
    ): string {
        const parsedIsbn = isbn.parse(book.isbn);

        if (book.title === null || parsedIsbn === null) return '';

        return (
            currentSeriesNames.find((seriesName) => {
                const booksOfSeries = groupedBooks.get(seriesName) || [];
                const publishers = booksOfSeries.map(
                    (bookOfSeries) =>
                        isbn.parse(bookOfSeries.isbn)?.publisher || '',
                );

                const contained =
                    seriesName
                        .toLowerCase()
                        .includes(book.title!.toLowerCase()) ||
                    book
                        .title!.toLowerCase()
                        .includes(seriesName.toLowerCase());

                return contained && publishers.includes(parsedIsbn.publisher);
            }) || ''
        );
    }

    /**
     * Tries to determine the series name by looking for an exact match with at least one other unassigned book.
     */
    private getSeriesNameOfBookByMultipleWithSameName(
        book: BookWithPublisherAndAuthors,
        allUnassignedBookNames: string[],
    ): string {
        if (book.title === null) return '';

        const bookTitle = book.title.toLowerCase();
        const otherBooksWithSameName = allUnassignedBookNames.filter(
            (otherBookName) => otherBookName.toLowerCase() === bookTitle,
        );

        if (otherBooksWithSameName.length > 1) return book.title;

        return '';
    }

    private isStringNumeric(str: string): boolean {
        return /^\d*$/.test(str);
    }
}
