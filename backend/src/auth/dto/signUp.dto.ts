import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class SignUpDto {
    @ApiProperty({ example: 'lillychan', maxLength: 25 })
    @IsString()
    @Length(3, 25)
    name: string;

    @ApiProperty({ example: 'me@example.com', maxLength: 50 })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '*wgtpGc3o$uVjW',
        maxLength: 50,
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    password: string;

    constructor(partial: Partial<SignUpDto>) {
        Object.assign(this, partial);
    }
}
