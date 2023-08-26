import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class BookGroupPatchDto {
    @ApiProperty()
    @IsString()
    @Length(1, 255)
    name: string;

    constructor(partial: Partial<BookGroupPatchDto>) {
        Object.assign(this, partial);
    }
}
