import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import { BooksService, BookStatus } from 'src/app/api';
import { BookWithMeta } from 'src/app/services/book-grouping.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
    private interval?: any;
    public rawBooks: BookWithMeta[] = [];

    constructor(private booksService: BooksService) {}

    ngOnInit(): void {
        this.booksService
            .getUserBooksByStatus(BookStatus.Owned)
            .pipe(take(1))
            .subscribe((books) => {
                this.rawBooks = books;
            });
        this.interval = setInterval(async () => {
            const bookResponse = await firstValueFrom(
                this.booksService.getUserBooksByStatus(BookStatus.Owned)
            );
            this.rawBooks = bookResponse;
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
    }
}
