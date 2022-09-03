import { prisma } from '../server';
import {
    Author,
    Book,
    BookStatus,
    Publisher,
    Snapshot,
    User,
} from '@prisma/client';
import { getBooksByStatus } from './book.manager';

export async function createNewSnapshotForUser(
    userId: number,
    ttl: number = -1
): Promise<
    Snapshot & {
        user: User;
        books: (Book & {
            authors: Author[];
            publisher: Publisher | null;
        })[];
    }
> {
    const currentBooks = await getBooksByStatus(userId, BookStatus.OWNED);

    return prisma.snapshot.create({
        data: {
            books: {
                connect: currentBooks.map((book) => ({ isbn: book.isbn })),
            },
            userId,
            ttl,
        },
        include: {
            books: {
                include: {
                    authors: true,
                    publisher: true,
                },
            },
            user: true,
        },
    });
}

export async function getSnapshot(
    userId: number,
    id: string
): Promise<
    | (Snapshot & {
          user: User;
          books: (Book & {
              authors: Author[];
              publisher: Publisher | null;
          })[];
      })
    | null
> {
    const snapshot = await prisma.snapshot.findFirst({
        where: {
            AND: {
                invalidated: false,
                id,
                userId,
            },
        },
        include: {
            books: {
                include: {
                    authors: true,
                    publisher: true,
                },
            },
            user: true,
        },
    });

    if (!snapshot || !isWithinTTL(snapshot)) {
        return null;
    }

    return snapshot;
}

export async function getSnapshots(userId: number): Promise<Snapshot[]> {
    const snapshots = await prisma.snapshot.findMany({
        where: {
            AND: {
                invalidated: false,
                userId,
            },
        },
    });

    return snapshots.filter((snapshot) => isWithinTTL(snapshot));
}

export async function invalidateSnapshot(id: string): Promise<void> {
    await prisma.snapshot.update({
        where: {
            id,
        },
        data: {
            invalidated: true,
        },
    });
}

function isWithinTTL(snapshot: Snapshot): boolean {
    if (!snapshot.ttl || snapshot.ttl < 0) {
        return true;
    }

    const timeDelta = Date.now() - snapshot.createdAt.getTime();

    return timeDelta <= snapshot.ttl;
}
