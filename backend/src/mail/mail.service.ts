import { Injectable, OnModuleInit } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import * as config from 'config';
import { htmlToText } from 'nodemailer-html-to-text';
import { PrismaService } from 'src/prisma/prisma.service';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';
import { readFileSync, readdirSync } from 'node:fs';

@Injectable()
export class MailService implements OnModuleInit {
    private transporter: Transporter;
    private mailTemplates: Record<string, string> = {};

    private readonly mailTemplateDir = './assets/mail';
    private readonly logger = new LokiLogger(MailService.name);

    constructor(private prisma: PrismaService) {
        if (!config.get<boolean>('mail.enabled')) return;

        this.transporter = createTransport(config.get<string>('mail.smtp'), {
            from: config.get<string>('mail.from'),
        });
        this.transporter.use('compile', htmlToText());
        this.loadTemplates();
    }

    private loadTemplates() {
        const files = readdirSync(this.mailTemplateDir);
        for (const file of files) {
            const name = file.split('.')[0];
            const content = readFileSync(
                `${this.mailTemplateDir}/${file}`,
                'utf-8',
            );
            this.mailTemplates[name] = content;

            this.logger.log(`Loaded mail template ${name}`);
        }
    }

    private getFormattedMail(name: string, data: Record<string, string>) {
        let template = this.mailTemplates[name];
        if (!template) {
            this.logger.error(`Could not find mail template ${name}`);
            return '';
        }

        data = { ...data, VERSION: config.get<string>('version') };

        for (const key in data) {
            template = template.replaceAll(`{{${key}}}`, data[key]);
        }

        return template;
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

    public async sendMail(
        to: string,
        subject: string,
        templateName: string,
        data: Record<string, string>,
    ) {
        if (!config.get<boolean>('mail.enabled')) return;

        const html = this.getFormattedMail(templateName, data);
        await this._sendMail(to, subject, html);
    }

    private async _sendMail(to: string, subject: string, html: string) {
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
