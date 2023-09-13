import { Injectable } from '@nestjs/common';
import { Publisher } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublishersService {
    constructor(private readonly prisma: PrismaService) {}

    async upsertPublisher(name: string): Promise<Publisher> {
        return await this.prisma.publisher.upsert({
            where: {
                name,
            },
            create: {
                name,
            },
            update: {},
        });
    }

    async getPublisherById(id: string): Promise<Publisher | null> {
        return await this.prisma.publisher.findFirst({
            where: {
                id,
            },
        });
    }

    async getPublishers(ids: string[]): Promise<Publisher[]> {
        return await this.prisma.publisher.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
}
