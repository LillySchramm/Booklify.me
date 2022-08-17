import { Author } from '@prisma/client';
import { prisma } from '../server';

export async function upsertAuthor(name: string): Promise<Author> {
    return prisma.author.upsert({
        where: {
            name,
        },
        create: {
            name,
        },
        update: {},
    });
}
