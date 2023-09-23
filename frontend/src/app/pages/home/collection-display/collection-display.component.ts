import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable, map, withLatestFrom } from 'rxjs';
import { BookDto } from 'src/app/api';
import { BookGroupMap, BooksState } from 'src/app/state/books/books.state';
import { BookGroupComponent } from '../book-group/book-group.component';

export interface BookGrouping {
    [key: string]: BookDto[];
}

@UntilDestroy()
@Component({
    selector: 'app-collection-display',
    standalone: true,
    imports: [CommonModule, BookGroupComponent],
    templateUrl: './collection-display.component.html',
    styleUrls: ['./collection-display.component.scss'],
})
export class CollectionDisplayComponent {
    @Select(BooksState.currentBookList) currentCollection$!: Observable<
        BookDto[] | undefined
    >;
    $currentCollection = toSignal(this.currentCollection$);

    @Select(BooksState.currentGroupMap) currentGroupMap$!: Observable<
        BookGroupMap | undefined
    >;
    $currentGroupMap = toSignal(this.currentGroupMap$);

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
    );
    $groupedBooks = toSignal(this.groupedBooks$);

    // @Select(BooksState.currentCollectionMap) currentCollectionMap$!: Observable<BookMap | undefined>;
    // $currentCollectionMap = toSignal(this.currentCollectionMap$);

    constructor(private store: Store) {}

    trackById(index: number, element: any): number {
        return element.key;
    }
}
