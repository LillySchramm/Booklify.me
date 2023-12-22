import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Report } from '@prisma/client';
import { CreateReportDto } from './dto/report.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import * as config from 'config';

const MOD_INFO_MAIL = `
<h1>User Report</h1>
<p>A user has been reported.</p>
<ul>
    <li>Target: %TARGET%</li>
    <li>Sender: %SENDER%</li>
    <li>Category: %CATEGORY%</li>
    <li>Message: %MESSAGE%</li>
</ul>
<div style="display: flex; gap: 1rem;">
    <a href="%DISMISS_URL%">DISMISS</a>
    <a href="%BAN_URL%">BAN</a>
</div>
<p>- Booklify.me</p>
`;

@Injectable()
export class ReportsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mail: MailService,
        private readonly userService: UsersService,
    ) {}

    async hasUserReportedUser(
        userId: string,
        targetId: string,
    ): Promise<boolean> {
        const reports = await this.prisma.report.findMany({
            where: {
                senderId: userId,
                targetId,
                resolved: false,
            },
        });

        return reports.length > 0;
    }

    async createReport(dto: CreateReportDto, senderId: string): Promise<void> {
        const key = randomBytes(40).toString('hex');
        const keyHash = await bcrypt.hash(key, 12);

        const report = await this.prisma.report.create({
            data: {
                targetId: dto.targetId,
                senderId: senderId,
                category: dto.category,
                message: dto.message,
                key: keyHash,
            },
        });

        const allModeratorEmails = await this.getAllModeratorMails();

        const target = await this.userService.findById(dto.targetId);
        const sender = await this.userService.findById(senderId);

        const apiBaseUrl = config.get<string>('api_url');

        const message = MOD_INFO_MAIL.replace(
            '%TARGET%',
            `${target!.name} (${target!.email}) <${target!.id}>`,
        )
            .replace(
                '%SENDER%',
                `${sender!.name} (${sender!.email}) <${sender!.id}>`,
            )
            .replace('%CATEGORY%', dto.category)
            .replace('%MESSAGE%', dto.message)
            .replace(
                '%BAN_URL%',
                `${apiBaseUrl}/reports/ban?key=${key}&id=${report.id}`,
            )
            .replace(
                '%DISMISS_URL%',
                `${apiBaseUrl}/reports/dismiss?key=${key}&id=${report.id}`,
            );

        this.mail.sendMail(
            allModeratorEmails.join(', '),
            'User report',
            message,
        );
    }

    async getAllModeratorMails(): Promise<string[]> {
        const moderators = await this.prisma.moderator.findMany();

        return moderators.map((mod) => mod.email);
    }

    async getReportById(id: string): Promise<Report | null> {
        return await this.prisma.report.findFirst({
            where: { id, resolved: false },
        });
    }

    async compareKey(key: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(key, hash);
    }

    async resolveReport(id: string): Promise<void> {
        await this.prisma.report.update({
            data: { resolved: true },
            where: { id },
        });
    }
}
