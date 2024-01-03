import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '@prisma/client';
import { IsEnum, IsUUID, ValidateIf } from 'class-validator';

export class SetOwnershipStatusDto {
    @ApiProperty({ enum: BookStatus })
    @IsEnum(BookStatus)
    status: BookStatus;

    @ApiProperty({ nullable: true, type: String })
    @IsUUID()
    @ValidateIf((_, value) => value !== null)
    bookGroupId: string | null;

    @ApiProperty({ type: Boolean, required: false })
    hidden: boolean | undefined;

    @ApiProperty({ type: Boolean, required: false })
    noGroup: boolean | undefined;

    constructor(partial: Partial<SetOwnershipStatusDto>) {
        Object.assign(this, partial);
    }
}
