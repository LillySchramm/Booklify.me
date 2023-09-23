import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LogLevel } from '@prisma/client/runtime/library';

import * as config from 'config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const logValues: LogLevel[] = ['warn', 'error'];
        if (config.get<boolean>('debug.show_query')) {
            logValues.push('info', 'query');
        }

        super({
            datasources: { db: { url: config.get<string>('db.url') } },
            log: logValues,
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
