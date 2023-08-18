import { ApiProperty } from '@nestjs/swagger';

export class NewPasswordDto {
    @ApiProperty()
    resetId: string;
    @ApiProperty()
    resetToken: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    newPassword: string;

    constructor(partial: Partial<NewPasswordDto>) {
        Object.assign(this, partial);
    }
}
