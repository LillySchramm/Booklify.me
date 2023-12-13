import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import { gotScraping as got } from 'got-scraping';

@Injectable()
export class RecaptchaService {
    private readonly logger = new Logger(RecaptchaService.name);

    async validateRecaptchaToken(token: string): Promise<boolean> {
        if (!config.get<boolean>('recaptcha.enabled')) {
            return true;
        }

        if (!token) {
            throw new UnauthorizedException('Recaptcha token is required');
        }

        const response = await got.post<any>(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                responseType: 'json',
                form: {
                    secret: config.get<string>('recaptcha.secret'),
                    response: token,
                },
            },
        );

        this.logger.debug(
            'Recaptcha Response: ' + JSON.stringify(response.body),
        );

        if (!response.body.success) {
            throw new UnauthorizedException('Recaptcha is invalid');
        }

        return true;
    }
}
