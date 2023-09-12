import { ApiProperty } from '@nestjs/swagger';
import { Author } from '@prisma/client';

export class AuthorDto implements Author {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;

    constructor(partial: Partial<AuthorDto>) {
        Object.assign(this, partial);
    }
}
