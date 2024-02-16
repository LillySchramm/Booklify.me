import {
    HttpException,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
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
import { LokiMiddleware } from './loki/loki.middleware';
import { ChangelogModule } from './changelog/changelog.module';
import { SentryModule, SentryInterceptor } from '@ntegral/nestjs-sentry';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as config from 'config';
import * as Sentry from '@sentry/node';

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
        ChangelogModule,
        SentryModule.forRoot({
            enabled: config.get<boolean>('sentry.backend.enabled'),
            dsn: config.get<string>('sentry.backend.dsn'),
            debug: true,
            environment: config.get<string>('sentry.environment'),
            logLevels: ['error', 'warn'],
            integrations: [
                ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
            ],
            attachStacktrace: true,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useFactory: () =>
                new SentryInterceptor({
                    filters: [
                        {
                            type: HttpException,
                            filter: (exception: HttpException) =>
                                500 > exception.getStatus(), // Only report 500 errors
                        },
                    ],
                }),
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LokiMiddleware).forRoutes('*');
    }
}
