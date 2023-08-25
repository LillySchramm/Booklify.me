import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SignInDto {
    @ApiProperty({ example: 'me@example.com', maxLength: 50 })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '*wgtpGc3o$uVjW',
        maxLength: 50,
    })
    password: string;

    constructor(partial: Partial<SignInDto>) {
        Object.assign(this, partial);
    }
}
