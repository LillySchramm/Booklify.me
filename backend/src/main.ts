import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'fs';
import * as config from 'config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as dotenv from 'dotenv';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const corsConfig = config.get<string>('cors');
    app.enableCors({ origin: corsConfig });

    const apiConfig = new DocumentBuilder()
        .setTitle('Booklify API')
        .setVersion('1.0')
        .addSecurity('bearer', {
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, apiConfig);
    SwaggerModule.setup('api', app, document);
    writeFileSync('./swagger-spec.json', JSON.stringify(document));
    const reflector = app.get(Reflector);

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
}
bootstrap();
