import { ApiProperty } from '@nestjs/swagger';

export class SystemInfoDto {
    @ApiProperty()
    signUpEnabled: boolean;

    constructor(partial: Partial<SystemInfoDto>) {
        Object.assign(this, partial);
    }
}
