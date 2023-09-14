import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Select, Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { BookDto } from 'src/app/api';
import { BooksState } from 'src/app/state/books/books.state';
import { BookGroupComponent } from '../book-group/book-group.component';

export interface BookGrouping {
    [key: string]: BookDto[];
}

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

    groupedBooks$ = this.currentCollection$.pipe(
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
        map((entries) => {
            return entries.sort((a, b) => {
                if (a.key === 'unknown') return 1;
                if (b.key === 'unknown') return -1;
                return a.key.localeCompare(b.key);
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
