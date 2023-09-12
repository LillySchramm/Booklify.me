import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BookDto } from 'src/app/api';
import { NoImagePlaceholderComponent } from 'src/app/common/components/no-image-placeholder/no-image-placeholder.component';
import { CoverService } from 'src/app/common/services/cover.service';
import { BookActions } from 'src/app/state/books/books.actions';
import { BooksState } from 'src/app/state/books/books.state';
import { UiActions } from 'src/app/state/ui/ui.actions';

@Component({
    selector: 'app-book-card',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        NoImagePlaceholderComponent,
        TranslocoModule,
    ],
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
    @Select(BooksState.selectedBook) selectedBook$!: Observable<
        BookDto | undefined
    >;
    $selectedBook = toSignal(this.selectedBook$);

    @Input() book!: BookDto;

    coverUrl?: string | null = '';

    constructor(
        private cover: CoverService,
        private store: Store,
    ) {}

    ngOnInit(): void {
        if (this.book.bookCoverId) {
            this.coverUrl = this.cover.getCoverUrl(this.book.bookCoverId);
        } else this.coverUrl = null;
    }

    openInfo(): void {
        this.store.dispatch(new UiActions.ChangeInfoVisibility(true));
        this.store.dispatch(new BookActions.SelectBook(this.book.isbn));
    }
}
