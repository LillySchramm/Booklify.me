import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class SetOwnershipStatusDto {
    @ApiProperty({ enum: BookStatus })
    @IsEnum(BookStatus)
    status: BookStatus;

    constructor(partial: Partial<SetOwnershipStatusDto>) {
        Object.assign(this, partial);
    }
}
