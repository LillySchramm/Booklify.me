import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SystemService } from './system.service';
import { SystemHealthDto } from './dto/systemHealth.dto';
import { SystemInfoDto } from './dto/systemInfo.dto';

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

        const response = new SystemInfoDto({
            signUpEnabled: !signUpDisabled,
        });

        return response;
    }
}