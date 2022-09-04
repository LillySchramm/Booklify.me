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
    private BLACKLISTED_CHUNKS = ['vol.', 'band', '-', '(finale)'];
    private SCHEMALESS_SERIES_NAMES = [/^black butler/gim, /^die walkinder/gim];

    private removeBlacklistedChunks(splitTitle: string[]): void {
        while (
            this.BLACKLISTED_CHUNKS.includes(
                splitTitle[splitTitle.length - 1].toLocaleLowerCase()
            )
        ) {
            splitTitle.pop();
        }
    }

    private getVolumeNumber(splitTitle: string[]): number {
        this.removeBlacklistedChunks(splitTitle);
        return Number(splitTitle[splitTitle.length - 1]);
    }

    private isKnownSchemaless(title: string): boolean {
        return !!this.SCHEMALESS_SERIES_NAMES.find((regex) =>
            regex.test(title)
        );
    }

    private getSeriesNameFromBookTitle(title: string): string {
        let groupName = this.DEFAULT_GROUP_NAME;

        if (this.isKnownSchemaless(title)) {
            return groupName;
        }

        const splitTitle = title.split(' ');
        const volumeNumber = this.getVolumeNumber(splitTitle);
        const lastChunkIsNumber = !_.isNaN(volumeNumber);

        if (lastChunkIsNumber) {
            splitTitle.pop();
            this.removeBlacklistedChunks(splitTitle);
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

        return foundGroupArray.map((series) => {
            series.books = series.books.sort((a, b) => {
                if (series.name === this.DEFAULT_GROUP_NAME) {
                    return (a.title || '') > (b.title || '') ? 1 : -1;
                }

                const aNumber = this.getVolumeNumber(a.title?.split(' ') || []);
                const bNumber = this.getVolumeNumber(b.title?.split(' ') || []);

                return aNumber > bNumber ? 1 : -1;
            });

            return series;
        });
    }
}
