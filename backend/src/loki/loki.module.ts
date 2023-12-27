import { Module } from '@nestjs/common';
import { LokiService } from './loki.service';
import { LokiLogger } from './loki-logger/loki-logger.service';

@Module({
    providers: [LokiService, LokiLogger],
})
export class LokiModule {}
