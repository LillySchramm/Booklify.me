import { Module } from '@nestjs/common';
import { TesseractService } from './tesseract.service';

@Module({
    providers: [TesseractService],
    exports: [TesseractService],
})
export class TesseractModule {}
