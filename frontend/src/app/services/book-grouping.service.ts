import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Author, Book, Publisher } from '../api';

export type BookWithMeta = Book & {
    authors: Author[];
    publisher: Publisher | null;
};

export interface Series {
    name: string;
    books: BookWithMeta[];
}

@Injectable({
    providedIn: 'root',
})
export class BookGroupingService {
    private DEFAULT_GROUP_NAME = 'Misc.';

    constructor() {}

    private getSeriesNameFromBookTitle(title: string): string {
        const blacklistedChunks = ['vol.', 'band', '-'];
        let groupName = this.DEFAULT_GROUP_NAME;

        const splitTitle = title.split(' ');
        const lastChunkNumber = Number(splitTitle[splitTitle.length - 1]);
        const lastChunkIsNumber = !_.isNaN(lastChunkNumber);

        if (lastChunkIsNumber) {
            splitTitle.pop();
            while (
                blacklistedChunks.includes(
                    splitTitle[splitTitle.length - 1].toLocaleLowerCase()
                )
            ) {
                splitTitle.pop();
            }
            groupName = splitTitle.join(' ');
        }

        return groupName;
    }

    public processBookList(books: BookWithMeta[]): Series[] {
        const foundGroups: Map<string, Series> = new Map();

        books.forEach((book) => {
            const groupName = this.getSeriesNameFromBookTitle(book.title || '');

            let series = foundGroups.get(groupName);
            series = series ? series : { name: groupName, books: [] };
            series.books.push(book);
            foundGroups.set(groupName, series);
        });

        let foundGroupArray = Array.from(foundGroups.values());
        foundGroupArray.sort((a, b) => {
            const aName = a.name;
            const bName = b.name;
            if (aName === this.DEFAULT_GROUP_NAME) {
                return 1;
            }

            if (bName === this.DEFAULT_GROUP_NAME) {
                return -1;
            }

            return aName > bName ? 1 : -1;
        });

        return foundGroupArray;
    }
}
