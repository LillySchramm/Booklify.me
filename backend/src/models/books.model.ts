export interface GoogleBookResponse {
    totalItems: number;
    items: GoogleVolume[];
}

export interface GoogleVolume {
    selfLink: string;
    volumeInfo: GoogleVolumeInfo;
}

export interface GoogleVolumeInfo {
    title: string;
    subtitle: string;
    description: string;
    authors: string[];
    publisher: string;
    language: string;
    pageCount: number;
    printedPageCount: number;
    publishedDate: string;
    imageLinks?: {
        thumbnail?: string;
    };
}
