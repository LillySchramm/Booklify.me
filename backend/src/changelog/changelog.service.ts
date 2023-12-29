import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { Cron } from 'src/cron/cron.service';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';
import * as MarkdonwTransformer from 'markdown-it';
import { MailService } from 'src/mail/mail.service';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChangelogService implements OnModuleInit {
    private readonly logger = new LokiLogger(ChangelogService.name);

    private latestVersion = '';
    private changelogHtml = '';

    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
    ) {}

    onModuleInit() {
        const transformer = new MarkdonwTransformer();
        const changelogText = readFileSync('./assets/CHANGELOG.md', 'utf-8');

        const allVersions = changelogText
            .split('## ')
            .filter((version) => version.startsWith('v'))
            .map((version) => version.split('-')[0].trim());
        this.latestVersion = allVersions[0];

        const changelogSections = changelogText.split('## v');
        const latestChangelog = changelogSections[1]
            .split('\n')
            .slice(1)
            .join('\n');

        this.changelogHtml = transformer.render(latestChangelog);

        this.logger.debug('Loaded changelog');
        this.logger.debug(this.changelogHtml);
    }

    public getLatestVersion(): string {
        return this.latestVersion;
    }

    @Cron()
    async sendChangelog() {
        const user = await this.getOneUserWithOutdatedChangelogFlag(
            this.latestVersion,
        );

        if (!user) return;

        this.logger.debug(`Sending changelog to ${user.email}`);
        this.mailService.sendMail(
            user.email,
            `Booklify.me was updated to ${this.latestVersion} 🎉`,
            'CHANGELOG',
            {
                CHANGELOG_HTML: this.changelogHtml,
                CHANGELOG_VERSION: this.latestVersion,
                USERNAME: user.name,
            },
        );

        await this.setLastNotifiedChangelogVersionFlag(
            user.id,
            this.latestVersion,
        );
    }

    async getOneUserWithOutdatedChangelogFlag(
        version: string,
    ): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                UserFlags: {
                    lastNotifiedChangelogVersion: { not: version },
                    changelogNotificationEnabled: true,
                },
                banned: false,
                activated: true,
            },
        });
    }

    async setLastNotifiedChangelogVersionFlag(
        userId: string,
        version: string,
    ): Promise<void> {
        await this.prisma.userFlags.update({
            where: { userId },
            data: { lastNotifiedChangelogVersion: version },
        });
    }
}
