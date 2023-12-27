import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LokiService } from '../loki.service';

@Injectable()
export class LokiLogger extends ConsoleLogger {
    constructor(context: string) {
        super(context);
    }

    log(message: any) {
        LokiService.addLog(message, 'log', this.context as string);

        super.log(message, this.context);
    }

    error(message: any) {
        LokiService.addLog(message, 'error', this.context as string);

        super.error(message, this.context);
    }

    warn(message: any) {
        LokiService.addLog(message, 'warn', this.context as string);

        super.warn(message, this.context);
    }

    debug(message: any) {
        LokiService.addLog(message, 'debug', this.context as string);

        super.debug(message, this.context);
    }

    verbose(message: any) {
        LokiService.addLog(message, 'verbose', this.context as string);

        super.verbose(message, this.context);
    }
}
