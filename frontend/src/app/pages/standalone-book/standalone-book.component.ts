import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { parse } from 'isbn3';
import { Observable, combineLatest, map } from 'rxjs';
import { BookDto } from 'src/app/api';
import { AmazonButtonComponent } from 'src/app/common/components/amazon-button/amazon-button.component';
import { NoImagePlaceholderComponent } from 'src/app/common/components/no-image-placeholder/no-image-placeholder.component';
import { CoverService } from 'src/app/common/services/cover.service';
import { AuthorMap, AuthorState } from 'src/app/state/authors/author.state';
import { BookActions } from 'src/app/state/books/books.actions';
import { BooksState } from 'src/app/state/books/books.state';
import {
    PublisherMap,
    PublisherState,
} from 'src/app/state/publisher/publisher.state';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';
import { IsbnPipe } from '../../common/pipes/isbn.pipe';
import { LanguagePipe } from '../../common/pipes/language.pipe';

@UntilDestroy()
@Component({
    selector: 'app-standalone-book',
    standalone: true,
    templateUrl: './standalone-book.component.html',
    styleUrl: './standalone-book.component.scss',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        TranslocoModule,
        NoImagePlaceholderComponent,
        DatePipe,
        NgClass,
        LanguagePipe,
        IsbnPipe,
        AmazonButtonComponent,
        MatDividerModule,
    ],
})
export class StandaloneBookComponent {
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

    @Select(BooksState.searchError) searchError$!: Observable<
        string | undefined
    >;
    $searchError = toSignal(this.searchError$);

    public coverUrl$ = this.searchResult$.pipe(
        map((book) => {
            if (book?.bookCoverId) {
                return this.cover.getCoverUrl(book.bookCoverId);
            }
            return null;
        }),
    );
    $coverUrl = toSignal(this.coverUrl$);

    @Select(PublisherState.publishers) publishers$!: Observable<PublisherMap>;
    @Select(AuthorState.authors) authors$!: Observable<AuthorMap>;

    publisherName$ = combineLatest([this.searchResult$, this.publishers$]).pipe(
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

    authorNames$ = combineLatest([this.searchResult$, this.authors$]).pipe(
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

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly store: Store,
        private readonly cover: CoverService,
        private readonly transloco: TranslocoService,
    ) {
        const { isbn } = this.route.snapshot.params;

        const parsedIsbn = parse(isbn);
        if (parsedIsbn === null || !parsedIsbn.isValid) {
            router.navigate(['']);
        }

        this.store.dispatch(new UserActions.LoadUser());
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(false));
        this.store.dispatch(new UiActions.ChangePageTitle(undefined));
        this.store.dispatch(new UiActions.ChangePageSubtitle(undefined));
        this.store.dispatch(new UiActions.ChangeSidenavMode(''));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangeReportId(undefined));

        this.store.dispatch(new BookActions.SearchBooks(isbn, true));
    }
}
