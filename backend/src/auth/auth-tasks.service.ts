import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';
import { Cron } from 'src/cron/cron.service';

@Injectable()
export class AuthTasksService {
    private readonly logger = new LokiLogger(AuthTasksService.name);

    constructor(private authService: AuthService) {}

    @Cron()
    async invalidateOutdatedSessions() {
        const invalidatedCount =
            await this.authService.invalidateExpiredSessions();
        if (!invalidatedCount) return;

        this.logger.log(`Invalidated ${invalidatedCount} sessions!`);
    }

    @Cron()
    async invalidateOutdatedTempSessions() {
        const invalidatedCount =
            await this.authService.invalidateOldNonPermanentSessions();
        if (!invalidatedCount) return;

        this.logger.log(
            `Invalidated ${invalidatedCount} non-permanent sessions!`,
        );
    }
}
