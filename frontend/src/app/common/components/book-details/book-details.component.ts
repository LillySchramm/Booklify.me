import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { BookDto, UserDto } from 'src/app/api';
import { UpdateBookOwnershipButtonComponent } from 'src/app/pages/home/update-book-ownership-button/update-book-ownership-button.component';
import { AuthorMap, AuthorState } from 'src/app/state/authors/author.state';
import {
    PublisherMap,
    PublisherState,
} from 'src/app/state/publisher/publisher.state';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { IsbnPipe } from '../../pipes/isbn.pipe';
import { LanguagePipe } from '../../pipes/language.pipe';
import { CoverService } from '../../services/cover.service';
import { AmazonButtonComponent } from '../amazon-button/amazon-button.component';
import { NoImagePlaceholderComponent } from '../no-image-placeholder/no-image-placeholder.component';
import { UserState } from 'src/app/state/user/user.state';
import { BooksState } from 'src/app/state/books/books.state';

@UntilDestroy()
@Component({
    selector: 'app-book-details',
    standalone: true,
    imports: [
        CommonModule,
        NoImagePlaceholderComponent,
        TranslocoModule,
        MatDividerModule,
        LanguagePipe,
        IsbnPipe,
        UpdateBookOwnershipButtonComponent,
        AmazonButtonComponent,
    ],
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
    @Input()
    set displayBook(book: BookDto | undefined) {
        this.book$.next(book);
    }

    @Input() compact = false;

    book$ = new BehaviorSubject<BookDto | undefined>(undefined);
    $book = toSignal(this.book$);

    @Select(UserState.currentUser) currentUser$!: Observable<
    UserDto | undefined
    >;
    $currentUser = toSignal(this.currentUser$);

    @Select(BooksState.currentOwnerId) currentOwnerId$!: Observable<
        string | undefined
    >;
    $currentOwnerId = toSignal(this.currentOwnerId$);

    shownBook: BookDto | undefined = undefined;

    @Select(PublisherState.publishers) publishers$!: Observable<PublisherMap>;
    @Select(AuthorState.authors) authors$!: Observable<AuthorMap>;

    publisherName$ = combineLatest([this.book$, this.publishers$]).pipe(
        untilDestroyed(this),
        map(([book, publishers]) => {
            if (!book || !book.publisherId) {
                return this.transloco.translate('book-details.noPublisher');
            }

            const publisher = publishers[book.publisherId];
            if (!publisher) {
                return this.transloco.translate(
                    'book-details.publisherLoading',
                );
            }

            return publisher.name;
        }),
    );
    $publisherName = toSignal(this.publisherName$);

    authorNames$ = combineLatest([this.book$, this.authors$]).pipe(
        untilDestroyed(this),
        map(([book, authors]) => {
            if (!book || !book.authors) {
                return [this.transloco.translate('book-details.noAuthors')];
            }

            if (!book.authors.length) {
                return [
                    this.transloco.translate('book-details.authorsLoading'),
                ];
            }

            return book.authors
                .map((identifier) => authors[identifier.id])
                .filter((author) => !!author)
                .map((author) => author.name);
        }),
    );
    $authorNames = toSignal(this.authorNames$);

    coverUrl?: string | null = '';

    constructor(
        private readonly store: Store,
        private readonly cover: CoverService,
        private readonly transloco: TranslocoService,
    ) {
        this.book$.pipe(untilDestroyed(this)).subscribe((book) => {
            if (!book) {
                return;
            }

            this.shownBook = book;

            if (book.bookCoverId) {
                this.coverUrl = this.cover.getCoverUrl(book.bookCoverId);
            } else {
                this.coverUrl = null;
            }

            this.store.dispatch(
                new UiActions.ChangeInfoTitle(book.title || ''),
            );
        });
    }
}
