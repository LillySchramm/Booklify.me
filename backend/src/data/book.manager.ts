import { Book, Author, Publisher } from '@prisma/client';
import { prisma } from '../server';

export async function getBookByIsbn(
    isbn: string
): Promise<(Book & { authors: Author[]; publisher: Publisher | null }) | null> {
    return prisma.book.findFirst({
        where: { isbn },
        include: {
            authors: true,
            publisher: true,
        },
    });
}

export async function createBook(
    isbn: string,
    title: string,
    subtitle: string,
    description: string,
    publisherId: string | undefined,
    language: string,
    pageCount: number,
    printedPageCount: number,
    publishedDate: string,
    authorNames: string[]
): Promise<Book & { authors: Author[]; publisher: Publisher | null }> {
    return prisma.book.create({
        data: {
            isbn,
            title,
            subtitle,
            description,
            publisherId,
            language,
            pageCount,
            printedPageCount,
            publishedDate,
            authors: {
                connect: authorNames.map((name) => ({ name })),
            },
        },
        include: {
            authors: true,
            publisher: true,
        },
    });
}
