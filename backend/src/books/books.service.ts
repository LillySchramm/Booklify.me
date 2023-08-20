import {
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from '@nestjs/common';

import { gotScraping } from 'got-scraping';
import {
    GoogleBookResponse,
    GoogleVolume,
    GoogleVolumeInfo,
} from './models/googleVolume.model';
import { S3Service } from 'src/s3/s3.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Author, Book, BookCover, Publisher } from '@prisma/client';
import { Retryable } from 'typescript-retry-decorator';
import { TesseractService } from 'src/tesseract/tesseract.service';
import { Magic } from 'mmmagic';
// import *  mimeMagic from 'file-type-cjs';
@Injectable()
export class BooksService {
    private bookApiBase = 'https://www.googleapis.com/books/v1/volumes';
    private bookCoverBase = 'https://images.isbndb.com/covers';

    private coverTextBlacklist: string[] = [
        'No Image Available',
        'Book Cover Not Available',
        'Cover Nicht',
    ];

    constructor(
        private s3: S3Service,
        private prisma: PrismaService,
        private tesseract: TesseractService,
    ) {}

    async upsertAuthor(name: string): Promise<Author> {
        return this.prisma.author.upsert({
            where: {
                name,
            },
            create: {
                name,
            },
            update: {},
        });
    }

    async upsertPublisher(name: string): Promise<Publisher> {
        return this.prisma.publisher.upsert({
            where: {
                name,
            },
            create: {
                name,
            },
            update: {},
        });
    }

    async doesBookExist(isbn: string) {
        const book = await this.prisma.book.findFirst({
            where: { isbn },
            select: { isbn: true },
        });

        return book != null;
    }

    async upsertBook(book: GoogleVolumeInfo, isbn: string) {
        const bookExists = await this.doesBookExist(isbn);
        if (bookExists) return;

        book.authors = book.authors ? book.authors : [];
        for (const name of book.authors) {
            await this.upsertAuthor(name);
        }

        if (book.publisher) {
            await this.upsertPublisher(book.publisher);
        }

        await this.prisma.book.create({
            data: {
                isbn,
                title: book.title,
                subtitle: book.subtitle,
                description: book.description,
                publisher: {
                    connect: {
                        name: book.publisher,
                    },
                },
                language: book.language,
                pageCount: book.pageCount,
                printedPageCount: book.printedPageCount,
                publishedDate: book.publishedDate,
                authors: {
                    connect: book.authors.map((name) => ({ name })),
                },
            },
        });
    }

    async getBookByIsbn(isbn: string): Promise<Book | null> {
        return await this.prisma.book.findFirst({ where: { isbn } });
    }

    async saveCoverImage(
        origin: string,
        imageData: Buffer,
    ): Promise<BookCover> {
        const cover = await this.prisma.bookCover.create({ data: { origin } });

        await this.s3.putObject(
            this.s3.bucketName,
            'thumbnails/' + cover.id + '.png',
            imageData,
        );

        return cover;
    }

    async setBookCover(isbn: string, imageId: string | null) {
        await this.prisma.book.update({
            where: { isbn },
            data: { bookCoverId: imageId },
        });
    }

    async getBook(isbn: string): Promise<Book | null> {
        const existingBook = await this.getBookByIsbn(isbn);
        if (existingBook != null) return existingBook;

        await this.scrapeBookMetaData(isbn);
        await this.scrapeBookCover(isbn);

        return await this.getBookByIsbn(isbn);
    }

    @Retryable({ maxAttempts: 3, backOff: 1000 })
    async scrapeBookMetaData(isbn: string) {
        const googleBookResponse = await gotScraping.get(
            this.bookApiBase + '?q=isbn:' + isbn,
        );

        const googleBookData: GoogleBookResponse = JSON.parse(
            googleBookResponse.body,
        );

        if (googleBookResponse.statusCode === 429) {
            throw new ServiceUnavailableException();
        }

        if (
            googleBookResponse.statusCode != 200 ||
            googleBookData.totalItems == 0
        ) {
            throw new NotFoundException();
        }

        const book: GoogleVolume = await gotScraping
            .get(googleBookData.items[0].selfLink)
            .json();

        await this.upsertBook(book.volumeInfo, isbn);
    }

    async scrapeBookCover(isbn: string) {
        const isbndbUrl = `${this.bookCoverBase}/${isbn.substring(
            isbn.length - 4,
            isbn.length - 2,
        )}/${isbn.substring(isbn.length - 2, isbn.length)}/${isbn}.jpg`;

        let imageBody: Buffer | undefined;
        const isbndbImage = await gotScraping.get(isbndbUrl);
        if (isbndbImage.statusCode === 200) {
            imageBody = isbndbImage.rawBody;
        }

        if (imageBody) {
            const type: string | string[] = await new Promise((resolve) => {
                const magic = new Magic();
                magic.detect(imageBody as Buffer, (_, result) =>
                    resolve(result),
                );
            });

            if (!type.includes('JPEG') || type.includes('Premature')) {
                await this.setBookCover(isbn, null);

                return;
            }

            const onBlacklist = await this.doesCoverContainBlacklistedWord(
                imageBody,
            );
            if (onBlacklist) {
                await this.setBookCover(isbn, null);

                return;
            }

            const cover = await this.saveCoverImage(isbndbUrl, imageBody);
            await this.setBookCover(isbn, cover.id);
        }
    }

    async doesCoverContainBlacklistedWord(buffer: Buffer): Promise<boolean> {
        let text = await this.tesseract.recognizeText(buffer);
        text = text.toLocaleLowerCase();
        text = text.replaceAll(' ', '').replaceAll('\n', '');

        for await (let item of this.coverTextBlacklist) {
            item = item.toLocaleLowerCase();
            item = item.replaceAll(' ', '').replaceAll('\n', '');

            if (text.includes(item)) {
                return true;
            }
        }

        return false;
    }
}
