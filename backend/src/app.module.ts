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
import { SecretsModule } from './secrets/secrets.module';
import { BookGroupsModule } from './book-groups/bookGroups.module';
import { AuthorsModule } from './authors/authors.module';
import { PublishersModule } from './publishers/publishers.module';
import { SystemModule } from './system/system.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { ReportsModule } from './reports/reports.module';
import { LokiModule } from './loki/loki.module';

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        UsersModule,
        MailModule,
        BooksModule,
        S3Module,
        TesseractModule,
        SecretsModule,
        BookGroupsModule,
        AuthorsModule,
        PublishersModule,
        SystemModule,
        ScheduleModule.forRoot(),
        CronModule.forRoot(),
        ReportsModule,
        LokiModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
