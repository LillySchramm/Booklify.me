import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class BookGroupPostDto {
    @ApiProperty()
    @IsString()
    @Length(1, 255)
    name: string;

    constructor(partial: Partial<BookGroupPostDto>) {
        Object.assign(this, partial);
    }
}
