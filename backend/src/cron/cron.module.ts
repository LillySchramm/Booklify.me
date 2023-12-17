import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { DiscoveryModule } from '@nestjs/core';

@Module({
    imports: [DiscoveryModule],
    providers: [CronService],
})
export class CronModule {
    static forRoot() {
        return {
            global: true,
            module: CronModule,
            providers: [CronService],
            exports: [CronService],
        };
    }
}
