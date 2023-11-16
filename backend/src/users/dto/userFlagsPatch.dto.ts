import { ApiProperty } from '@nestjs/swagger';

export class UserFlagsPatchDto {
    @ApiProperty({ required: false, type: Boolean })
    public?: boolean;

    constructor(partial: Partial<UserFlagsPatchDto>) {
        Object.assign(this, partial);
    }
}
