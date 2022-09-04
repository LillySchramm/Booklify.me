import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { firstValueFrom, take } from 'rxjs';
import { BooksService, BookStatus } from 'src/app/api';
import {
    BookGroupingService,
    BookWithMeta,
    Series,
} from 'src/app/services/book-grouping.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
    private interval?: any;

    public ownedBooks: Series[] = [];
    public rawBooks: BookWithMeta[] = [];
    public openByDefault = false;

    constructor(
        private booksService: BooksService,
        private groupingService: BookGroupingService
    ) {}

    ngOnInit(): void {
        this.booksService
            .getUserBooksByStatus(BookStatus.Owned)
            .pipe(take(1))
            .subscribe((books) => {
                this.ownedBooks = this.groupingService.processBookList(books);
                this.rawBooks = books;
            });
        this.interval = setInterval(async () => {
            const currentIsbns = this.getAllCurrentIsbns().sort();

            const bookResponse = await firstValueFrom(
                this.booksService.getUserBooksByStatus(BookStatus.Owned)
            );
            this.rawBooks = bookResponse;
            const responseIsbns = bookResponse.map((book) => book.isbn);

            if (!_.isEqual(currentIsbns, responseIsbns)) {
                this.ownedBooks =
                    this.groupingService.processBookList(bookResponse);
            }
        }, 1000);
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

    onDisplayChange(event: { checked: boolean }) {
        this.openByDefault = event.checked;

        if (event.checked) {
            this.ownedBooks = [{ books: this.rawBooks, name: 'All' }];
            return;
        }

        this.ownedBooks = this.groupingService.processBookList(this.rawBooks);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
}
