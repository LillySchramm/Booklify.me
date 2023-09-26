import { ApiProperty } from '@nestjs/swagger';
import { PasswordResetRequest } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ResetPasswordDto implements PasswordResetRequest {
    @ApiProperty()
    id: string;
    @Exclude()
    invalidated: boolean;
    @Exclude()
    keyHash: string;
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
    @Exclude()
    userId: string;
    @Exclude()
    token: string;

    constructor(partial: Partial<ResetPasswordDto>) {
        Object.assign(this, partial);
    }
}
