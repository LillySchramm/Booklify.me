import { ApiProperty } from '@nestjs/swagger';
import { BookGroupDto } from './bookGroupDto.dto';

export class BookGroupListDto {
    @ApiProperty({ type: [BookGroupDto] })
    groups: BookGroupDto[];

    constructor(partial: Partial<BookGroupListDto>) {
        Object.assign(this, partial);
    }
}
