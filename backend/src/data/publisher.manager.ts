import { Publisher } from '@prisma/client';
import { prisma } from '../server';

export async function upsertPublisher(publisher: string): Promise<Publisher> {
    return prisma.publisher.upsert({
        where: {
            name: publisher,
        },
        create: {
            name: publisher,
        },
        update: {},
    });
}
