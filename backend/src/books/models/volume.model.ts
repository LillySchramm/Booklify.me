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
    };
}

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
    description?: string;
}
