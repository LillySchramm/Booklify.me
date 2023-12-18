import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
    Length,
    Matches,
} from 'class-validator';

export class SignUpDto {
    @ApiProperty({ example: 'lillychan', maxLength: 25 })
    @IsString()
    @Length(3, 25)
    @Matches(/^([a-zA-Z\._\-0-9])*$/)
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

    @ApiProperty()
    @IsString()
    recaptchaToken: string;

    @ApiProperty({ example: true, nullable: true, type: Boolean })
    @IsOptional()
    @IsBoolean()
    agreedTos: boolean | null;

    @ApiProperty({ example: true, nullable: true, type: Boolean })
    @IsOptional()
    @IsBoolean()
    agreedPrivacy: boolean | null;

    constructor(partial: Partial<SignUpDto>) {
        Object.assign(this, partial);
    }
}
