import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { BooksModule } from './books/books.module';
import { S3Module } from './s3/s3.module';
import { TesseractModule } from './tesseract/tesseract.module';

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        UsersModule,
        MailModule,
        BooksModule,
        S3Module,
        TesseractModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
