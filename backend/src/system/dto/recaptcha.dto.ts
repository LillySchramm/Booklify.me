import { ApiProperty } from '@nestjs/swagger';

export class RecaptchaDto {
    @ApiProperty()
    enabled: boolean;
    @ApiProperty()
    siteKey: string;

    constructor(partial: Partial<RecaptchaDto>) {
        Object.assign(this, partial);
    }
}
