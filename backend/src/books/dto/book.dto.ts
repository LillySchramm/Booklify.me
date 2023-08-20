import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';

export class BookDto implements Book {
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

    constructor(partial: Partial<BookDto>) {
        Object.assign(this, partial);
    }
}
