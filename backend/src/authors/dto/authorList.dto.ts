import { ApiProperty } from '@nestjs/swagger';
import { AuthorDto } from './author.dto';

export class AuthorListDto {
    @ApiProperty({ type: AuthorDto, isArray: true })
    authors: AuthorDto[];

    constructor(partial: Partial<AuthorListDto>) {
        Object.assign(this, partial);
    }
}
