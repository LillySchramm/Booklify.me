import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class BookListDto {
    @ApiProperty({ type: [BookDto] })
    books: BookDto[];

    constructor(partial: Partial<BookListDto>) {
        Object.assign(this, partial);
    }
}
