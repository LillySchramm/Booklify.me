import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { firstValueFrom, take } from 'rxjs';
import { Author, Book, BooksService, BookStatus, Publisher } from 'src/app/api';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    public ownedBooks: (Book & {
        authors: Author[];
        publisher: Publisher | null;
    })[] = [];
    constructor(private booksService: BooksService) {}

    ngOnInit(): void {
        this.booksService
            .getUserBooksByStatus(BookStatus.Owned)
            .pipe(take(1))
            .subscribe((books) => {
                this.ownedBooks = books;
            });
        setInterval(async () => {
            const currentIsbns = this.ownedBooks.map((book) => book.isbn);

            const bookResponse = await firstValueFrom(
                this.booksService.getUserBooksByStatus(BookStatus.Owned)
            );
            const responseIsbns = bookResponse.map((book) => book.isbn);

            if (!_.isEqual(currentIsbns, responseIsbns)) {
                this.ownedBooks = bookResponse;
            }
        }, 1000);
    }
}
