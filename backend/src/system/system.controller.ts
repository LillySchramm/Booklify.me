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
import { ReportsDto } from './dto/reports.dto';
import { AmazonDto } from './dto/amazon.dto';
import { promisify } from 'util';

import * as child_process from 'child_process';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';

const exec = promisify(child_process.exec);

@Controller('system')
@ApiTags('System')
export class SystemController {
    private readonly logger = new LokiLogger(SystemController.name);

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

        const reports = new ReportsDto({
            enabled: config.get<boolean>('reports.enabled'),
        });

        const amazon = new AmazonDto({
            referralTag: config.get<string>('amazon.referral_tag'),
        });

        const cdn = config.get<string>('cdn_url');

        const response = new SystemInfoDto({
            signUpEnabled: !signUpDisabled,
            cdn,
            recaptcha,
            legal,
            reports,
            version: config.get<string>('version'),
            amazon,
        });

        return response;
    }

    @Get('reset')
    @ApiOkResponse({ type: SystemInfoDto })
    async reset() {
        const out = await exec('prisma migrate reset --force');

        this.logger.log(out.stdout + out.stderr);
    }
}
