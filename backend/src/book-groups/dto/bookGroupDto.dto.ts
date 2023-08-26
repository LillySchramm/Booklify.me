import { ApiProperty } from '@nestjs/swagger';
import { BookGroup } from '@prisma/client';

export class BookGroupDto implements BookGroup {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;

    constructor(partial: Partial<BookGroupDto>) {
        Object.assign(this, partial);
    }
}
