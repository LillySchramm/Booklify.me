import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    BookGroupingService,
    BookWithMeta,
    Series,
} from 'src/app/services/book-grouping.service';

@Component({
    selector: 'app-books-display',
    templateUrl: './books-display.component.html',
    styleUrls: ['./books-display.component.scss'],
})
export class BooksDisplayComponent implements OnChanges {
    @Input() rawBooks: BookWithMeta[] = [];

    public ownedBooks: Series[] = [];

    public openByDefault = false;
    private combineAll = false;
    constructor(private groupingService: BookGroupingService) {}
    ngOnChanges(_: SimpleChanges): void {
        this.updateGroups();
    }

    public trackSeries(_: number, item: Series) {
        return item.name;
    }

    onDisplayChange(event: { checked: boolean }) {
        this.openByDefault = event.checked;
        this.combineAll = event.checked;

        this.updateGroups();
    }

    updateGroups(): void {
        if (this.combineAll) {
            this.ownedBooks = [
                {
                    books: this.rawBooks.sort((a, b) => {
                        return (a.title || '') > (b.title || '') ? 1 : -1;
                    }),
                    name: 'All',
                },
            ];
            return;
        }

        this.ownedBooks = this.groupingService.processBookList(this.rawBooks);
    }
}
