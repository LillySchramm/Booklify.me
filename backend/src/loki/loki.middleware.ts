import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LokiService } from './loki.service';

const uuidRegex =
    /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g;
const isbnRegex = /\b\d{13}\b/g;

@Injectable()
export class LokiMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction): void {
        const { method } = request;
        const url = this.cleanUrl(request.originalUrl);
        let ip =
            request.headers['x-forwarded-for'] ||
            request.socket.remoteAddress ||
            'unknown';
        if (typeof ip !== 'string') {
            ip = ip[0];
        }

        const userAgent = request.get('user-agent') || '';
        const start = Date.now();

        let body = request.body || {};
        body = this.removeSecrets(body);

        response.on('close', () => {
            const { statusCode } = response;
            const duration = Date.now() - start;

            LokiService.addRequestLog(JSON.stringify(body), {
                duration: duration.toString(),
                ip: ip as string,
                method,
                path: url,
                rawPath: request.originalUrl,
                userAgent,
                statusCode: statusCode.toString(),
            });
        });

        next();
    }

    private cleanUrl(url: string): string {
        return url.replaceAll(uuidRegex, ':id').replaceAll(isbnRegex, ':isbn');
    }

    private removeSecrets(obj: any): any {
        return JSON.parse(
            JSON.stringify(obj, (k, v) => (k === 'password' ? '********' : v)),
        );
    }
}
