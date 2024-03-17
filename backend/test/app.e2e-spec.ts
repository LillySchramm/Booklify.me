import { Test, TestingModule } from '@nestjs/testing';
import {
    ClassSerializerInterceptor,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import config from 'config';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const app = await NestFactory.create(AppModule);

        const corsConfig = config.get<string>('cors');
        app.enableCors({ origin: corsConfig });
        const reflector = app.get(Reflector);

        app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
        app.useGlobalPipes(new ValidationPipe());

        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
