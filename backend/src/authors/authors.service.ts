import { Injectable } from '@nestjs/common';
import { Author } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorsService {
    constructor(private readonly prisma: PrismaService) {}

    async upsertAuthor(name: string): Promise<Author> {
        return await this.prisma.author.upsert({
            where: {
                name,
            },
            create: {
                name,
            },
            update: {},
        });
    }

    async getAuthor(id: string): Promise<Author | null> {
        return await this.prisma.author.findFirst({
            where: {
                id,
            },
        });
    }

    async getAuthors(ids: string[]): Promise<Author[]> {
        return await this.prisma.author.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
}
