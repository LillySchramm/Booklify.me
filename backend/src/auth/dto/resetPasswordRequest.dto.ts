import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequestDto {
    @ApiProperty()
    email: string;

    constructor(partial: Partial<ResetPasswordRequestDto>) {
        Object.assign(this, partial);
    }
}
