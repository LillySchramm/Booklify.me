import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Observable } from 'rxjs';
import { BookDto } from 'src/app/api';
import { NoImagePlaceholderComponent } from 'src/app/common/components/no-image-placeholder/no-image-placeholder.component';
import { CoverService } from 'src/app/common/services/cover.service';
import { UiService } from 'src/app/common/services/ui.service';
import { BookActions } from 'src/app/state/books/books.actions';
import { BooksState } from 'src/app/state/books/books.state';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UiState } from 'src/app/state/ui/ui.state';

@Component({
    selector: 'app-book-card',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        NoImagePlaceholderComponent,
        TranslocoModule,
        LazyLoadImageModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
    @Select(BooksState.selectedBook) selectedBook$!: Observable<
        BookDto | undefined
    >;
    $selectedBook = toSignal(this.selectedBook$);

    @Select(UiState.isInfoFullyVisible)
    isInfoFullyVisible$!: Observable<boolean>;
    $isInfoFullyVisible = toSignal(this.isInfoFullyVisible$);

    @Input() book!: BookDto;
    @Input() showFlags: boolean = false;

    coverUrl?: string | null = '';

    constructor(
        private cover: CoverService,
        private store: Store,
        public ui: UiService,
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

    scroll(el: HTMLElement, i: number = 0) {
        if (this.$isInfoFullyVisible()) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (i < 50) {
            el.scrollIntoView({ behavior: 'instant', block: 'center' });
            setTimeout(() => {
                this.scroll(el, i + 1);
            }, 2);
        }
    }

    setVisible(visible: boolean): void {
        this.store.dispatch(
            new BookActions.UpdateBookVisibility([this.book.isbn], visible),
        );
    }

    setGroup(group: boolean): void {
        this.store.dispatch(
            new BookActions.UpdatedBookGrouping([this.book.isbn], group),
        );
    }

    remove(): void {
        this.store.dispatch(
            new BookActions.ChangeOwnership(this.book.isbn, {
                bookGroupId: null,
                status: 'NONE',
            }),
        );
    }
}
