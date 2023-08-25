import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import * as config from 'config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            datasources: { db: { url: config.get<string>('database.url') } },
            log: ['query', 'warn', 'error'],
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
