import {
    Controller,
    Post,
    UseGuards,
    Request,
    Body,
    PreconditionFailedException,
    BadRequestException,
    Get,
    Query,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import * as config from 'config';
import { CreateReportDto } from './dto/report.dto';
import { ReportsService } from './reports.service';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
    private readonly logger = new LokiLogger(ReportsController.name);

    constructor(
        private readonly userService: UsersService,
        private readonly reportService: ReportsService,
    ) {}

    @Post('')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async createReport(@Request() request: any, @Body() body: CreateReportDto) {
        if (!config.get<boolean>('reports.enabled'))
            throw new PreconditionFailedException('Reports are disabled');

        const user = request.user;

        const hasReported = await this.reportService.hasUserReportedUser(
            user.id,
            body.targetId,
        );
        if (hasReported)
            throw new BadRequestException(
                'User has already been reported by you',
            );

        const reportedUser = await this.userService.findById(body.targetId);
        if (!reportedUser) throw new BadRequestException('User not found');

        if (reportedUser.id === user.id)
            throw new BadRequestException('You cannot report yourself');

        await this.reportService.createReport(body, user.id);
    }

    @Get('ban')
    async banUser(
        @Query('key') key: string,
        @Query('id', ParseUUIDPipe) id: string,
    ) {
        if (!config.get<boolean>('reports.enabled'))
            throw new PreconditionFailedException('Reports are disabled');

        const report = await this.reportService.getReportById(id);
        if (!report) throw new BadRequestException('Report not found');

        const keyMatches = await this.reportService.compareKey(key, report.key);
        if (!keyMatches) throw new BadRequestException('Key does not match');

        await this.userService.banUser(report.targetId);
        await this.reportService.resolveReport(report.id);

        return 'User banned';
    }

    @Get('dismiss')
    async dismissReport(
        @Query('key') key: string,
        @Query('id', ParseUUIDPipe) id: string,
    ) {
        if (!config.get<boolean>('reports.enabled'))
            throw new PreconditionFailedException('Reports are disabled');

        const report = await this.reportService.getReportById(id);
        if (!report) throw new BadRequestException('Report not found');

        const keyMatches = await this.reportService.compareKey(key, report.key);
        if (!keyMatches) throw new BadRequestException('Key does not match');

        await this.reportService.resolveReport(report.id);

        return 'Report dismissed';
    }
}
