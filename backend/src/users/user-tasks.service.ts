import { Injectable } from '@nestjs/common';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';
import { Cron } from 'src/cron/cron.service';
import { UsersService } from './users.service';

@Injectable()
export class UserTasksService {
    private readonly logger = new LokiLogger(UserTasksService.name);

    constructor(private userService: UsersService) {}

    @Cron()
    async deleteUnactivatedUsers() {
        const deletedCount = await this.userService.deleteUnactivatedUsers();
        if (!deletedCount) return;

        this.logger.log(`Deleted ${deletedCount} unactivated users!`);
    }
}
