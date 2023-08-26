import { Injectable } from '@nestjs/common';
import { BookGroup } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookGroupsService {
    constructor(private readonly prisma: PrismaService) {}

    async getBookGroup(
        bookGroupId: string,
        userId: string,
    ): Promise<BookGroup | null> {
        return await this.prisma.bookGroup.findFirst({
            where: { id: bookGroupId, userId },
        });
    }

    async createBookGroup(name: string, userId: string): Promise<BookGroup> {
        return await this.prisma.bookGroup.create({
            data: {
                name,
                userId,
            },
        });
    }

    async updateBookGroup(
        bookGroupId: string,
        name: string,
        userId: string,
    ): Promise<BookGroup> {
        return await this.prisma.bookGroup.update({
            data: {
                name,
            },
            where: {
                id: bookGroupId,
                userId,
            },
        });
    }

    async deleteBookGroup(bookGroupId: string, userId: string): Promise<void> {
        await this.prisma.bookGroup.delete({
            where: {
                id: bookGroupId,
                userId,
            },
        });
    }

    async getAllBookGroupsOfUser(userId: string): Promise<BookGroup[]> {
        return await this.prisma.bookGroup.findMany({
            where: { userId },
        });
    }
}
