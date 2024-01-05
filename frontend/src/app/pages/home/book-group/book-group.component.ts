import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, map } from 'rxjs';
import { BookDto, BookGroupDto, UserDto } from 'src/app/api';
import { BookActions } from 'src/app/state/books/books.actions';
import { BooksState } from 'src/app/state/books/books.state';
import { UserState } from 'src/app/state/user/user.state';
import { BookCardComponent } from '../book-card/book-card.component';

@UntilDestroy()
@Component({
    selector: 'app-book-group',
    standalone: true,
    imports: [
        CommonModule,
        TranslocoModule,
        MatExpansionModule,
        BookCardComponent,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
    ],
    templateUrl: './book-group.component.html',
    styleUrls: ['./book-group.component.scss'],
})
export class BookGroupComponent implements OnInit {
    @Select(UserState.currentUser) currentUser$!: Observable<
        UserDto | undefined
    >;
    $currentUser = toSignal(this.currentUser$);

    @Select(BooksState.currentOwnerId) currentOwnerId$!: Observable<
        string | undefined
    >;
    $currentOwnerId = toSignal(this.currentOwnerId$);

    allHidden$: Subject<boolean> = new Subject<boolean>();
    $allHidden = toSignal(this.allHidden$);

    allGrouped$: Subject<boolean> = new Subject<boolean>();
    $allGrouped = toSignal(this.allGrouped$);

    @Input() groupId!: string;
    @Input()
    set books(books: BookDto[]) {
        if (!books || books === this._books) {
            return;
        }

        const allHidden = books.every((book) => book.hidden);
        this.allHidden$.next(allHidden);

        const allGrouped = books.every((book) => !book.noGroup);
        this.allGrouped$.next(allGrouped);

        this._books = books;
    }
    get books(): BookDto[] {
        return this._books;
    }
    _books!: BookDto[];

    group$?: Observable<BookGroupDto>;

    constructor(
        private store: Store,
        private transloco: TranslocoService,
    ) {}

    ngOnInit(): void {
        this.group$ = this.store.select(BooksState.group(this.groupId)).pipe(
            untilDestroyed(this),
            map((group) => {
                if (!group) {
                    return {
                        id: this.groupId,
                        name: this.transloco.translate('book-groups.unknown'),
                    } as BookGroupDto;
                }
                return group;
            }),
        );

        this.group$.subscribe();
    }

    trackById(index: number, element: BookDto): string {
        return element.isbn;
    }

    setVisible(visible: boolean): void {
        const bookIds = this.books.map((book) => book.isbn);
        this.store.dispatch(
            new BookActions.UpdateBookVisibility(bookIds, visible),
        );
    }

    setGroup(group: boolean): void {
        const bookIds = this.books.map((book) => book.isbn);
        this.store.dispatch(
            new BookActions.UpdatedBookGrouping(bookIds, group),
        );
    }
}
