import { ApiProperty } from '@nestjs/swagger';
import { RecaptchaDto } from './recaptcha.dto';
import { LegalDto } from './legal.dto';
import { ReportsDto } from './reports.dto';

export class SystemInfoDto {
    @ApiProperty()
    signUpEnabled: boolean;
    @ApiProperty()
    recaptcha: RecaptchaDto;
    @ApiProperty()
    legal: LegalDto;
    @ApiProperty()
    reports: ReportsDto;
    @ApiProperty()
    version: string;

    constructor(partial: Partial<SystemInfoDto>) {
        Object.assign(this, partial);
    }
}
