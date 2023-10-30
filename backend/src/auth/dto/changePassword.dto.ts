import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
    @ApiProperty()
    oldPassword: string;

    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    newPassword: string;

    constructor(partial: Partial<ChangePasswordDto>) {
        Object.assign(this, partial);
    }
}
