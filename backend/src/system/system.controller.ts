import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SystemService } from './system.service';
import { SystemHealthDto } from './dto/systemHealth.dto';
import { SystemInfoDto } from './dto/systemInfo.dto';
import { RecaptchaDto } from './dto/recaptcha.dto';
import * as config from 'config';
import { LegalDto } from './dto/legal.dto';

@Controller('system')
@ApiTags('System')
export class SystemController {
    constructor(private systemService: SystemService) {}

    @Get('health')
    @ApiOkResponse({ type: SystemHealthDto })
    @ApiInternalServerErrorResponse({ type: SystemHealthDto })
    async getSystemHealth() {
        const database = await this.systemService.checkDatabase();
        const s3 = await this.systemService.checkS3();

        const response = new SystemHealthDto({ database, s3 });

        if (!database || !s3) {
            throw new InternalServerErrorException(response);
        }

        return response;
    }

    @Get('info')
    @ApiOkResponse({ type: SystemInfoDto })
    async getSystemInfo() {
        const signUpDisabled = await this.systemService.isSignUpDisabled();

        const recaptcha = new RecaptchaDto({
            enabled: config.get<boolean>('recaptcha.enabled'),
            siteKey: config.get<string>('recaptcha.site_key'),
        });

        const legal = new LegalDto({
            tosUrl: config.get<string>('legal.terms_of_service'),
            privacyUrl: config.get<string>('legal.privacy_policy'),
            enabled: config.get<boolean>('legal.enabled'),
        });

        const response = new SystemInfoDto({
            signUpEnabled: !signUpDisabled,
            recaptcha,
            legal,
        });

        return response;
    }
}
