import {
    Book,
    Author,
    Publisher,
    OwnershipStatus,
    BookStatus,
} from '@prisma/client';
import { prisma } from '../server';

export async function getBookByIsbn(
    isbn: string,
    userId: number
): Promise<
    | (Book & {
          authors: Author[];
          publisher: Publisher | null;
          ownershipStatus: OwnershipStatus[];
      })
    | null
> {
    return prisma.book.findFirst({
        where: { isbn },
        include: {
            authors: true,
            publisher: true,
            ownershipStatus: {
                where: {
                    userId,
                },
            },
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
    authorNames: string[],
    userId: number
): Promise<
    Book & {
        authors: Author[];
        publisher: Publisher | null;
        ownershipStatus: OwnershipStatus[];
    }
> {
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
            ownershipStatus: {
                where: {
                    userId,
                },
            },
        },
    });
}

export async function setOwnershipStatus(
    isbn: string,
    userId: number,
    status: BookStatus
): Promise<void> {
    await prisma.ownershipStatus.upsert({
        create: {
            status,
            bookIsbn: isbn,
            userId,
        },
        update: {
            status,
        },
        where: {
            userId_bookIsbn: {
                bookIsbn: isbn,
                userId,
            },
        },
    });
}

export async function getBooksByStatus(
    userId: number,
    status: BookStatus
): Promise<
    (Book & {
        authors: Author[];
        publisher: Publisher | null;
    })[]
> {
    return prisma.book.findMany({
        where: {
            ownershipStatus: {
                some: {
                    AND: {
                        status,
                        userId,
                    },
                },
            },
        },
        include: {
            authors: true,
            publisher: true,
        },
        orderBy: {
            isbn: 'asc',
        },
    });
}
