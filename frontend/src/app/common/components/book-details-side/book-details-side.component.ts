import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BookActions } from 'src/app/state/books/books.actions';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UiState } from 'src/app/state/ui/ui.state';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
    selector: 'app-book-details-side',
    standalone: true,
    imports: [CommonModule, MatButtonModule, BookDetailsComponent],
    templateUrl: './book-details-side.component.html',
    styleUrls: ['./book-details-side.component.scss'],
})
export class BookDetailsSideComponent {
    @Select(UiState.infoTitle) title$!: Observable<string | undefined>;
    $title = toSignal(this.title$);

    constructor(private store: Store) {}

    close(): void {
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new BookActions.SelectBook(undefined));
    }
}
