import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateReportDto {
    @ApiProperty()
    @IsEnum($Enums.ReportCategory)
    category: $Enums.ReportCategory;

    @ApiProperty({ nullable: true, type: String })
    @IsString()
    @MaxLength(255)
    alternateCategory: string | null;

    @ApiProperty()
    @IsString()
    @MaxLength(1000)
    message: string;

    @ApiProperty()
    @IsString()
    @IsUUID()
    targetId: string;

    constructor(partial: Partial<CreateReportDto>) {
        Object.assign(this, partial);
    }
}
