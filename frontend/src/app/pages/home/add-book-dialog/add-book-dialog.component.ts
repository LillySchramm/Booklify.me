import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BookDto } from 'src/app/api';
import { BookDetailsComponent } from 'src/app/common/components/book-details/book-details.component';
import { FormErrorPipe } from 'src/app/common/pipes/form-error.pipe';
import { CustomValidators } from 'src/app/common/validators/validators';
import { BookActions } from 'src/app/state/books/books.actions';
import { BooksState } from 'src/app/state/books/books.state';

@Component({
    selector: 'app-add-book-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        TranslocoModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormErrorPipe,
        MatProgressBarModule,
        BookDetailsComponent,
        MatTooltipModule,
    ],
    templateUrl: './add-book-dialog.component.html',
    styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent {
    @Select(BooksState.searchLoading) searchLoading$!: Observable<boolean>;
    $searchLoading = toSignal(this.searchLoading$);

    @Select(BooksState.searchedBook) searchResult$!: Observable<
        BookDto | undefined
    >;
    $searchResult = toSignal(this.searchResult$);

    @Select(BooksState.currentCollection) currentCollection$!: Observable<
        string[] | undefined
    >;
    $currentCollection = toSignal(this.currentCollection$);

    @Select(BooksState.ownershipChangeLoading)
    ownershipChangeLoading$!: Observable<boolean>;
    $ownershipChangeLoading = toSignal(this.ownershipChangeLoading$);

    public form = new FormGroup({
        isbn: new FormControl('', [
            Validators.required,
            CustomValidators.isbnValidator(),
        ]),
    });

    constructor(private store: Store) {}

    search() {
        if (this.form.invalid || this.form.pristine || !this.form.value.isbn)
            return;

        const isbn = this.form.value.isbn.replaceAll(/\D/g, '');
        this.store.dispatch(new BookActions.SearchBooks(isbn, false));
    }

    addBook(hide: boolean) {
        const book = this.$searchResult();

        if (
            this.$ownershipChangeLoading() ||
            !book ||
            this.$currentCollection()?.includes(book.isbn)
        )
            return;

        this.store.dispatch(
            new BookActions.ChangeOwnership(book.isbn, {
                bookGroupId: book.groupId,
                status: 'OWNED',
                hidden: hide,
            }),
        );
    }
}
