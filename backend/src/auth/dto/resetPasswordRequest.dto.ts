import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetPasswordRequestDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    constructor(partial: Partial<ResetPasswordRequestDto>) {
        Object.assign(this, partial);
    }
}
