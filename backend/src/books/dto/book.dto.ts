import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export type BookWithGroupId = Book & {
    OwnershipStatus: {
        bookGroupId: string | null;
    }[];
};

export class BookDto implements BookWithGroupId {
    @ApiProperty()
    isbn: string;
    @ApiProperty({ nullable: true, type: String })
    title: string | null;
    @ApiProperty({ nullable: true, type: String })
    subtitle: string | null;
    @ApiProperty({ nullable: true, type: String })
    publishedDate: string | null;
    @ApiProperty({ nullable: true, type: String })
    description: string | null;
    @ApiProperty({ nullable: true, type: Number })
    pageCount: number | null;
    @ApiProperty({ nullable: true, type: Number })
    printedPageCount: number | null;
    @ApiProperty({ nullable: true, type: String })
    language: string | null;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty({ nullable: true, type: String })
    publisherId: string | null;
    @ApiProperty({ nullable: true, type: String })
    bookCoverId: string | null;
    @Exclude()
    OwnershipStatus: { bookGroupId: string | null }[];

    @ApiProperty({ type: String, nullable: true })
    @Expose()
    get groupId(): string | null {
        if (this.OwnershipStatus.length === 0) {
            return null;
        }

        return this.OwnershipStatus[0].bookGroupId;
    }

    constructor(partial: Partial<BookDto>) {
        Object.assign(this, partial);
    }
}
