import { ApiProperty } from '@nestjs/swagger';
import { RecaptchaDto } from './recaptcha.dto';

export class SystemInfoDto {
    @ApiProperty()
    signUpEnabled: boolean;
    @ApiProperty()
    recaptcha: RecaptchaDto;

    constructor(partial: Partial<SystemInfoDto>) {
        Object.assign(this, partial);
    }
}
