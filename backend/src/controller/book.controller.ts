import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { PingResponse } from '../models/ping.model';
import got from 'got';
import jpeg from 'jpeg-js';
import { GoogleBookResponse, GoogleVolume } from '../models/books.model';
import { createWriteStream, mkdir, readFileSync } from 'fs';
import { notFoundImage } from '../app';
import { Author, Book, Prisma, Publisher } from '@prisma/client';
import { prisma } from '../server';

@Route('v1/books')
@Tags('Books')
export class BookController extends Controller {
    private bookApiBase = 'https://www.googleapis.com/books/v1/volumes';
    private bookCoverBase = 'https://images.isbndb.com/covers';

    /**
     * Retrieves Information about the given book.
     * @example isbn 9781648275784
     */
    @Get('{isbn}')
    public async getBook(
        @Path() isbn: number
    ): Promise<
        (Book & { authors: Author[]; publisher: Publisher | null }) | undefined
    > {
        const isbnString = isbn.toString();
        // this is just a small POC. will be refactored in the near future
        const dbBook = await prisma.book.findFirst({
            where: {
                isbn: isbnString,
            },
            include: {
                authors: true,
                publisher: true,
            },
        });

        if (dbBook) {
            return dbBook;
        }

        const googleBookResponse: GoogleBookResponse = await got
            .get(this.bookApiBase + '?q=isbn:' + isbn)
            .json();

        if (googleBookResponse.totalItems !== 1) {
            this.setStatus(404);
            return;
        }

        const book: GoogleVolume = await got
            .get(googleBookResponse.items[0].selfLink)
            .json();

        // These are 3 fucking redundant systems to get the fucking cover bc someone is alway missing one

        let imageBody: Buffer | undefined;

        const isbndbUrl = `${this.bookCoverBase}/${isbnString.substring(
            isbnString.length - 4,
            isbnString.length - 2
        )}/${isbnString.substring(
            isbnString.length - 2,
            isbnString.length
        )}/${isbn}.jpg`;
        const isbndbImage = await got.get(isbndbUrl);
        if (isbndbImage.statusCode === 200) {
            try {
                const foundImage = jpeg.decode(isbndbImage.rawBody);

                if (
                    foundImage.height !== notFoundImage.height ||
                    foundImage.width !== notFoundImage.width
                ) {
                    imageBody = isbndbImage.rawBody;
                }
            } catch (_) {}
        }

        if (!imageBody) {
            let imageLink = book.volumeInfo.imageLinks?.thumbnail;
            // Try getting another volume with the same name, to find a thumbnail
            if (
                !book.volumeInfo.imageLinks ||
                !book.volumeInfo.imageLinks.thumbnail
            ) {
                const googleBookResponseFromTitle: GoogleBookResponse =
                    await got
                        .get(
                            this.bookApiBase +
                                '?q=title:' +
                                book.volumeInfo.title
                        )
                        .json();

                const bookWithSameTitle =
                    googleBookResponseFromTitle.items.find(
                        (_book) =>
                            _book.volumeInfo.title === book.volumeInfo.title
                    );
                if (bookWithSameTitle) {
                    imageLink =
                        bookWithSameTitle.volumeInfo.imageLinks?.thumbnail;
                }
            }

            if (imageLink) {
                const image = await got.get(imageLink);
                imageBody = image.rawBody;
            } else {
                imageBody = notFoundImage.data;
            }
        }

        mkdir('./public/thumbnails', { recursive: true }, () => {
            createWriteStream('./public/thumbnails/' + isbn + '.png').write(
                imageBody
            );
        });

        book.volumeInfo.authors = book.volumeInfo.authors
            ? book.volumeInfo.authors
            : [];
        book.volumeInfo.authors.forEach(async (name) => {
            await prisma.author.upsert({
                where: {
                    name,
                },
                create: {
                    name,
                },
                update: {},
            });
        });

        let publisher;
        if (book.volumeInfo.publisher) {
            publisher = await prisma.publisher.upsert({
                where: {
                    name: book.volumeInfo.publisher,
                },
                create: {
                    name: book.volumeInfo.publisher,
                },
                update: {},
            });
        }

        return prisma.book.create({
            data: {
                isbn: isbnString,
                title: book.volumeInfo.title,
                subtitle: book.volumeInfo.subtitle,
                description: book.volumeInfo.description,
                authors: {
                    connect: book.volumeInfo.authors.map((name) => ({ name })),
                },
                publisherId: publisher?.id,
                language: book.volumeInfo.language,
                pageCount: book.volumeInfo.pageCount,
                printedPageCount: book.volumeInfo.printedPageCount,
                publishedDate: book.volumeInfo.publishedDate,
            },
            include: {
                authors: true,
                publisher: true,
            },
        });
    }
}
