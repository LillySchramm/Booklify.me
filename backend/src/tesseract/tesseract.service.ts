import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createWorker, Worker as TWorker } from 'tesseract.js';

@Injectable()
export class TesseractService implements OnModuleInit {
    private readonly logger = new Logger(TesseractService.name);

    private enWorker: TWorker;
    private deWorker: TWorker;

    async onModuleInit() {
        this.enWorker = await createWorker({ errorHandler: () => 0 });
        await this.enWorker.loadLanguage('eng');
        await this.enWorker.initialize('eng');

        this.deWorker = await createWorker({ errorHandler: () => 0 });
        await this.deWorker.loadLanguage('deu');
        await this.deWorker.initialize('deu');

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
