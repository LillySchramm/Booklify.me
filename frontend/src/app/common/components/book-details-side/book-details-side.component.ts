import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { BookActions } from 'src/app/state/books/books.actions';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
    selector: 'app-book-details-side',
    standalone: true,
    imports: [CommonModule, MatButtonModule, BookDetailsComponent],
    templateUrl: './book-details-side.component.html',
    styleUrls: ['./book-details-side.component.scss'],
})
export class BookDetailsSideComponent {
    constructor(private store: Store) {}

    close(): void {
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new BookActions.SelectBook(undefined));
    }
}
