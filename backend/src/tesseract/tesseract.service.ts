import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createWorker, Worker as TWorker } from 'tesseract.js';

@Injectable()
export class TesseractService implements OnModuleInit {
    private readonly logger = new Logger(TesseractService.name);

    private enWorker: TWorker;
    private deWorker: TWorker;

    async onModuleInit() {
        this.logger.log('Initializing workers...');
        this.enWorker = await createWorker('eng', undefined, {
            errorHandler: () => 0,
        });
        this.deWorker = await createWorker('deu', undefined, {
            errorHandler: () => 0,
        });

        this.logger.log('Finished worker initialization!');
    }

    async recognizeText(buffer: Buffer): Promise<string> {
        const {
            data: { text: enText },
        } = await this.enWorker.recognize(buffer);

        const {
            data: { text: deText },
        } = await this.deWorker.recognize(buffer);

        return enText + deText;
    }
}
