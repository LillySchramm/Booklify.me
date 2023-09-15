import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import * as config from 'config';
import { htmlToText } from 'nodemailer-html-to-text';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MailService implements OnModuleInit {
    private transporter: Transporter;

    private readonly logger = new Logger(MailService.name);

    constructor(private prisma: PrismaService) {
        if (!config.get<boolean>('mail.enabled')) return;

        this.transporter = createTransport(config.get<string>('mail.smtp'), {
            from: '"BooklifyMe" <no-reply@booklify.me>',
        });
        this.transporter.use('compile', htmlToText());
    }

    async onModuleInit() {
        this.logger.log('Checking mail config...');
        if (!config.get<boolean>('mail.enabled')) {
            this.logger.log('Mail disabled. Skipping...');
            return;
        }

        const configValid = await this.transporter.verify();
        if (!configValid) {
            throw new Error('Mail config invalid.');
        }

        this.logger.log('Mail config valid!');
    }

    async sendMail(to: string, subject: string, html: string) {
        const info = await this.transporter.sendMail({
            to,
            subject,
            html,
        });

        this.logger.log('Message sent: ' + info.messageId);
        await this.prisma.mailLog.create({
            data: {
                id: info.messageId,
                content: html,
                from: this.transporter.options.from?.toString() || '',
                title: subject,
                to,
            },
        });
    }
}
