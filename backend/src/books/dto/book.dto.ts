import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export type BookWithGroupIdAndAuthors = Book & {
    OwnershipStatus: {
        bookGroupId: string | null;
        hidden: boolean;
        noGroup: boolean;
    }[];
    authors: {
        id: string;
    }[];
};

class IdentifierDto {
    @ApiProperty()
    id: string;
}

export class BookDto implements BookWithGroupIdAndAuthors {
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
    @ApiProperty({ type: () => IdentifierDto, isArray: true })
    authors: IdentifierDto[];
    @Exclude()
    series: string | null;
    @Exclude()
    OwnershipStatus: {
        bookGroupId: string | null;
        hidden: boolean;
        noGroup: boolean;
    }[];

    @ApiProperty({ type: String, nullable: true })
    @Expose()
    get groupId(): string | null {
        if (this.OwnershipStatus.length === 0) {
            return null;
        }

        return this.OwnershipStatus[0].bookGroupId;
    }

    @ApiProperty({ type: Boolean })
    @Expose()
    get hidden(): boolean {
        if (this.OwnershipStatus.length === 0) {
            return false;
        }

        return this.OwnershipStatus[0].hidden;
    }

    @ApiProperty({ type: Boolean })
    @Expose()
    get noGroup(): boolean {
        if (this.OwnershipStatus.length === 0) {
            return false;
        }

        return this.OwnershipStatus[0].noGroup;
    }

    constructor(partial: Partial<BookDto>) {
        Object.assign(this, partial);
    }
}
