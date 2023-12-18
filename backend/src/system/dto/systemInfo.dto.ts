import { ApiProperty } from '@nestjs/swagger';
import { RecaptchaDto } from './recaptcha.dto';
import { LegalDto } from './legal.dto';

export class SystemInfoDto {
    @ApiProperty()
    signUpEnabled: boolean;
    @ApiProperty()
    recaptcha: RecaptchaDto;
    @ApiProperty()
    legal: LegalDto;

    constructor(partial: Partial<SystemInfoDto>) {
        Object.assign(this, partial);
    }
}
