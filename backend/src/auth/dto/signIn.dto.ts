import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail } from 'class-validator';

export class SignInDto {
    @ApiProperty({ example: 'me@example.com', maxLength: 50 })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '*wgtpGc3o$uVjW',
        maxLength: 50,
    })
    password: string;

    @ApiProperty({
        example: true,
        description: 'Whether to create a permanent session',
    })
    @IsBoolean()
    permanent: boolean;

    constructor(partial: Partial<SignInDto>) {
        Object.assign(this, partial);
    }
}
