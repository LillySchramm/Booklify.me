import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword, IsUUID } from 'class-validator';

export class NewPasswordDto {
    @ApiProperty()
    resetId: string;
    @ApiProperty()
    resetToken: string;
    @ApiProperty()
    @IsUUID()
    userId: string;
    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    newPassword: string;

    constructor(partial: Partial<NewPasswordDto>) {
        Object.assign(this, partial);
    }
}
