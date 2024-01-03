import { Injectable } from '@nestjs/common';
import { BookGroup, OwnershipStatus } from '@prisma/client';
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

    async getAllBookGroupsOfUser(
        userId: string,
        includeHidden: boolean = true,
    ): Promise<BookGroup[]> {
        const groups = await this.prisma.bookGroup.findMany({
            where: {
                userId,
                OwnershipStatus: includeHidden
                    ? {}
                    : { some: { hidden: false, status: 'OWNED' } },
            },
        });

        return groups;
    }

    async getAllBookGroupsOfUserWithOwnershipStatus(
        userId: string,
    ): Promise<(BookGroup & { OwnershipStatus: OwnershipStatus[] })[]> {
        return await this.prisma.bookGroup.findMany({
            where: { userId },
            include: {
                OwnershipStatus: { where: { userId } },
            },
        });
    }

    async getAllUnassignedBooksOfUser(
        userId: string,
    ): Promise<OwnershipStatus[]> {
        return await this.prisma.ownershipStatus.findMany({
            where: { userId, bookGroupId: null },
        });
    }

    async deleteEmptyBookGroupsOfUser(userId: string): Promise<void> {
        await this.prisma.bookGroup.deleteMany({
            where: { userId, OwnershipStatus: { none: {} } },
        });
    }
}
