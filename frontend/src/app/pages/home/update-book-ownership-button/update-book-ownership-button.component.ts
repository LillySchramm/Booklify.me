import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BookDto } from 'src/app/api';
import { BookActions } from 'src/app/state/books/books.actions';
import { BooksState } from 'src/app/state/books/books.state';

@Component({
    selector: 'app-update-book-ownership-button',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, TranslocoModule],
    templateUrl: './update-book-ownership-button.component.html',
    styleUrls: ['./update-book-ownership-button.component.scss'],
})
export class UpdateBookOwnershipButtonComponent {
    @Select(BooksState.ownsSelectedBook)
    ownsSelectedBook$!: Observable<boolean>;
    $ownsSelectedBook = toSignal(this.ownsSelectedBook$);

    @Select(BooksState.ownershipChangeLoading)
    ownershipChangeLoading$!: Observable<boolean>;
    $ownershipChangeLoading = toSignal(this.ownershipChangeLoading$);

    @Select(BooksState.selectedBook) selectedBook$!: Observable<
        BookDto | undefined
    >;
    $selectedBook = toSignal(this.selectedBook$);

    constructor(private store: Store) {}

    updateOwnership(): void {
        const book = this.$selectedBook();

        if (this.$ownershipChangeLoading() || !book) return;

        this.store.dispatch(
            new BookActions.ChangeOwnership(book.isbn, {
                bookGroupId: book.groupId,
                status: this.$ownsSelectedBook() ? 'NONE' : 'OWNED',
            }),
        );
    }
}
