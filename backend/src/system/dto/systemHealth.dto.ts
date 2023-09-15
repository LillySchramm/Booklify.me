import { ApiProperty } from '@nestjs/swagger';

export class SystemHealthDto {
    @ApiProperty()
    database: boolean;
    @ApiProperty()
    s3: boolean;

    constructor(partial: Partial<SystemHealthDto>) {
        Object.assign(this, partial);
    }
}
