import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { firstValueFrom, take } from 'rxjs';
import { Author, Book, BooksService, BookStatus, Publisher } from 'src/app/api';

type BookWithMeta = Book & {
    authors: Author[];
    publisher: Publisher | null;
};

interface Series {
    name: string;
    books: BookWithMeta[];
}

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
    private DEFAULT_GROUP_NAME = 'Misc.';
    private interval?: any;

    public ownedBooks: Series[] = [];
    constructor(private booksService: BooksService) {}

    ngOnInit(): void {
        this.booksService
            .getUserBooksByStatus(BookStatus.Owned)
            .pipe(take(1))
            .subscribe((books) => {
                this.ownedBooks = this.processBookList(books);
            });
        this.interval = setInterval(async () => {
            const currentIsbns = this.getAllCurrentIsbns().sort();

            const bookResponse = await firstValueFrom(
                this.booksService.getUserBooksByStatus(BookStatus.Owned)
            );
            const responseIsbns = bookResponse.map((book) => book.isbn);

            if (!_.isEqual(currentIsbns, responseIsbns)) {
                this.ownedBooks = this.processBookList(bookResponse);
            }
        }, 1000);
    }

    private getSeriesNameFromBookTitle(title: string): string {
        const blacklistedChunks = ['vol.', 'band', '-'];
        let groupName = this.DEFAULT_GROUP_NAME;

        const splitTitle = title.split(' ');
        const lastChunkNumber = Number(splitTitle[splitTitle.length - 1]);
        const lastChunkIsNumber = !_.isNaN(lastChunkNumber);

        if (lastChunkIsNumber) {
            splitTitle.pop();
            while (
                blacklistedChunks.includes(
                    splitTitle[splitTitle.length - 1].toLocaleLowerCase()
                )
            ) {
                splitTitle.pop();
            }
            groupName = splitTitle.join(' ');
        }

        return groupName;
    }

    private processBookList(books: BookWithMeta[]): Series[] {
        const foundGroups: Map<string, Series> = new Map();

        books.forEach((book) => {
            const groupName = this.getSeriesNameFromBookTitle(book.title || '');

            let series = foundGroups.get(groupName);
            series = series ? series : { name: groupName, books: [] };
            series.books.push(book);
            foundGroups.set(groupName, series);
        });

        let foundGroupArray = Array.from(foundGroups.values());
        foundGroupArray.sort((a, b) => {
            const aName = a.name;
            const bName = b.name;
            if (aName === this.DEFAULT_GROUP_NAME) {
                return 1;
            }

            if (bName === this.DEFAULT_GROUP_NAME) {
                return -1;
            }

            return aName > bName ? 1 : -1;
        });

        return foundGroupArray;
    }

    private getAllCurrentIsbns(): string[] {
        const isbns: string[] = [];

        this.ownedBooks.forEach((series) =>
            series.books.forEach((book) => isbns.push(book.isbn))
        );

        return isbns;
    }

    public trackSeries(_: number, item: Series) {
        return item.name;
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
}
