import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { TesseractModule } from 'src/tesseract/tesseract.module';

@Module({
    providers: [BooksService],
    controllers: [BooksController],
    imports: [S3Module, PrismaModule, TesseractModule],
})
export class BooksModule {}
