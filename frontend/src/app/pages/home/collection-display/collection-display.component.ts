import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable, map, withLatestFrom } from 'rxjs';
import { BookDto } from 'src/app/api';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { BookGroupMap, BooksState } from 'src/app/state/books/books.state';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { BookGroupComponent } from '../book-group/book-group.component';

export interface BookGrouping {
    [key: string]: BookDto[];
}

@UntilDestroy()
@Component({
    selector: 'app-collection-display',
    standalone: true,
    imports: [
        BookGroupComponent,
        TranslocoModule,
        MatProgressSpinnerModule,
        ScrollingModule,
        NgClass,
        FooterComponent,
    ],
    templateUrl: './collection-display.component.html',
    styleUrls: ['./collection-display.component.scss'],
})
export class CollectionDisplayComponent {
    @Select(BooksState.currentBookList) currentCollection$!: Observable<
        BookDto[] | undefined
    >;
    $currentCollection = toSignal(this.currentCollection$);

    @Select(BooksState.filter) filter$!: Observable<string | undefined>;
    @Select(BooksState.authorFilter) authorFilter$!: Observable<
        string[] | undefined
    >;

    @Select(BooksState.currentGroupMap) currentGroupMap$!: Observable<
        BookGroupMap | undefined
    >;
    $currentGroupMap = toSignal(this.currentGroupMap$);

    @Select(BooksState.currentOwnerId) currentOwnerId$!: Observable<
        string | undefined
    >;

    @Select(BooksState.loadingCollection)
    loadingCollection$!: Observable<boolean>;
    $loadingCollection = toSignal(this.loadingCollection$);

    groupedBooks$ = this.currentCollection$.pipe(
        untilDestroyed(this),
        map((collection) => {
            if (!collection) return {} as BookGrouping;

            const map = {} as BookGrouping;

            for (const book of collection) {
                const groupId = book.groupId || 'unknown';
                if (!map[groupId]) {
                    map[groupId] = [];
                }

                map[groupId].push(book);
            }

            return map;
        }),
        map((map) => {
            return Object.entries(map).map(([key, value]) => {
                return {
                    key,
                    value,
                };
            });
        }),
        map((entries) => entries.filter((entry) => entry.value.length > 0)),
        withLatestFrom(this.currentGroupMap$),
        map(([entries, groupMap]) => {
            if (!groupMap)
                return [] as {
                    key: string;
                    value: BookDto[];
                }[];

            return entries.sort((a, b) => {
                if (a.key === 'unknown') return 1;
                if (b.key === 'unknown') return -1;

                const aGroup = groupMap[a.key];
                const bGroup = groupMap[b.key];
                if (!aGroup) return 1;
                if (!bGroup) return -1;

                return aGroup.name.localeCompare(bGroup.name);
            });
        }),
        map((entries) => {
            return entries.map((entry) => {
                return {
                    key: entry.key,
                    value: entry.value.sort((a, b) => {
                        if (a.title && b.title) {
                            const aNumber = this.getBookNumberFromTitle(
                                a.title,
                            );
                            const bNumber = this.getBookNumberFromTitle(
                                b.title,
                            );

                            if (aNumber && bNumber) {
                                return aNumber > bNumber ? 1 : -1;
                            }
                        }

                        return a.isbn.localeCompare(b.isbn);
                    }),
                };
            });
        }),
        withLatestFrom(this.filter$, this.authorFilter$),
        map(([entries, filter, authorFilter]) => {
            if (!filter && !authorFilter) return entries;

            const cache = this.getFilterFromCache(
                entries.length,
                filter,
                authorFilter,
            );
            if (cache) return cache;

            return entries
                .map((entry) => {
                    return {
                        key: entry.key,
                        value: entry.value.filter((book) =>
                            this.filterBook(
                                book,
                                entry.key,
                                filter,
                                authorFilter,
                            ),
                        ),
                    };
                })
                .filter((entry) => entry.value.length > 0);
        }),
    );
    $groupedBooks = toSignal(this.groupedBooks$);

    filterCache: Map<
        string,
        {
            key: string;
            value: BookDto[];
        }[]
    > = new Map();
    lastFilterSize = 0;

    constructor(private store: Store) {
        this.currentOwnerId$.pipe(untilDestroyed(this)).subscribe((ownerId) => {
            this.store.dispatch(new UiActions.ChangeReportId(ownerId));
        });
    }

    trackById(index: number, element: any): number {
        return element.key;
    }

    filterBook(
        book: BookDto,
        groupName: string,
        filter: string | undefined,
        authorFilter: string[] | undefined,
    ): boolean {
        filter = filter ? filter.toLowerCase() : '';

        const containsAuthor = authorFilter?.length
            ? !!book.authors.find((author) => authorFilter.includes(author.id))
            : true;
        if (!containsAuthor) return false;

        if (book.title === null) return false;

        return (
            book.title.toLowerCase().includes(filter) ||
            book.isbn.includes(filter) ||
            groupName.toLowerCase().includes(filter)
        );
    }

    getBookNumberFromTitle(title: string): number | null {
        const regex = /\d+/g;
        const found = title.match(regex);
        if (found) {
            return Number.parseInt(found[found.length - 1]);
        }
        return null;
    }

    private getFilterFromCache(
        count: number,
        filter: string | undefined,
        authorFilter: string[] | undefined,
    ):
        | {
              key: string;
              value: BookDto[];
          }[]
        | null {
        if (!this.filterCache) this.filterCache = new Map();

        if (this.lastFilterSize !== count) {
            this.filterCache.clear();
            this.lastFilterSize = count;
        }

        const key = `${filter}-${authorFilter?.join('-')}`;
        return this.filterCache.get(key) || null;
    }
}
