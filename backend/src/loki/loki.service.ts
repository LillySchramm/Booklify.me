import { Injectable } from '@nestjs/common';
import { Cron } from 'src/cron/cron.service';
import * as config from 'config';

interface LokiPOST {
    streams: {
        stream: { [key: string]: string };
        values: LokiLog[];
    }[];
}

type LokiLog = [string, string];
type LokiBuffer = { [key: string]: LokiLog[] };
type LokiMetadata = { [key: string]: string };

type LokiRequestMetadata = {
    path: string;
    method: string;
    ip: string;
    userAgent: string;
    duration: string;
    statusCode: string;
};

@Injectable()
export class LokiService {
    private static buffer: LokiBuffer = {};

    private static readonly lokiApi = config.get<string>('loki.api');
    private static readonly lokiEnabled = config.get<boolean>('loki.enabled');
    private static readonly lokiUsername = config.get<string>('loki.username');
    private static readonly lokiPassword = config.get<string>('loki.password');

    private static apiURL = config.get<string>('api_url');
    public static addLog(message: string, level: string, context: string) {
        if (!this.lokiEnabled) return;

        const now = new Date().getTime().toString();
        const nano = process.hrtime.bigint().toString().slice(-6);
        const nowNano = now + nano;

        const log: LokiLog = [nowNano, message];

        this.pushBuffer(log, {
            level,
            context,
            type: 'log',
        });
    }

    public static addRequestLog(
        message: string,
        lokiRequestMetadata: LokiRequestMetadata,
    ) {
        if (!this.lokiEnabled) return;

        const now = new Date().getTime().toString();
        const nano = process.hrtime.bigint().toString().slice(-6);
        const nowNano = now + nano;

        const log: LokiLog = [nowNano, message];

        this.pushBuffer(log, { ...lokiRequestMetadata, type: 'request' });
    }

    private static pushBuffer(log: LokiLog, metadata: LokiMetadata) {
        const key = JSON.stringify(metadata);
        if (!this.buffer[key]) this.buffer[key] = [];

        this.buffer[key].push(log);
    }

    @Cron()
    private async flushLoki() {
        const buffer = LokiService.buffer;
        LokiService.buffer = {};

        if (!Object.keys(buffer).length) return;

        const lokiPOST: LokiPOST = {
            streams: [],
        };

        for (const key in buffer) {
            let logs = buffer[key];
            logs = logs.sort((a, b) => {
                if (a[0] < b[0]) return -1;
                if (a[0] > b[0]) return 1;
                return 0;
            });
            const metadata = JSON.parse(key);

            lokiPOST.streams.push({
                stream: {
                    ...metadata,
                    api: LokiService.apiURL,
                },
                values: logs,
            });
        }

        const result = await fetch(LokiService.lokiApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Basic ' +
                    Buffer.from(
                        LokiService.lokiUsername +
                            ':' +
                            LokiService.lokiPassword,
                    ).toString('base64'),
            },
            body: JSON.stringify(lokiPOST),
        });

        if (!result.ok) {
            // eslint-disable-next-line no-console
            console.error('Loki error', result.statusText);
        }
    }
}
