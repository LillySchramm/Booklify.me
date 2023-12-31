export interface VolumeInfo {
    title?: string;
    subtitle?: string;
    description?: string;
    authors?: string[];
    publisher?: string;
    language?: string;
    pageCount?: number;
    printedPageCount?: number;
    publishedDate?: string;
    imageLinks?: {
        thumbnail?: string;
        isbndb?: string;
    };
    series?: string;
    incomplete?: boolean;
}

type StringOrObject = string | { type: string; value: string };

export interface GoogleBookResponse {
    totalItems: number;
    items: GoogleVolume[];
}

export interface GoogleVolume {
    selfLink: string;
    volumeInfo: VolumeInfo;
}

export interface OpenLibraryBookVolume {
    title?: string;
    publishers?: string[];
    publish_date?: string;
    number_of_pages?: number;
    subtitle?: string;
    covers?: number[];
    description?: StringOrObject;
}

export interface IsbndbBookResponse {
    book: IsbndbBook;
}

export interface IsbndbBook {
    title: string;
    title_long: string;
    publisher: string;
    pages: number;
    image: string;
    authors: string[];
    date_published: string;
    synopsis: string;
}
