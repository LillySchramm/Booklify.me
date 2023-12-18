import { ApiProperty } from '@nestjs/swagger';

export class LegalDto {
    @ApiProperty()
    enabled: boolean;
    @ApiProperty()
    tosUrl: string;
    @ApiProperty()
    privacyUrl: string;

    constructor(partial: Partial<LegalDto>) {
        Object.assign(this, partial);
    }
}
