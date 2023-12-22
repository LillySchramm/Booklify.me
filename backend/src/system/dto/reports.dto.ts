import { ApiProperty } from '@nestjs/swagger';

export class ReportsDto {
    @ApiProperty()
    enabled: boolean;

    constructor(partial: Partial<ReportsDto>) {
        Object.assign(this, partial);
    }
}
