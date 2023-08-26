import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { TesseractModule } from 'src/tesseract/tesseract.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SecretsModule } from 'src/secrets/secrets.module';
import { BookGroupsModule } from 'src/book-groups/bookGroups.module';
@Module({
    providers: [BooksService],
    controllers: [BooksController],
    imports: [
        S3Module,
        PrismaModule,
        TesseractModule,
        UsersModule,
        AuthModule,
        SecretsModule,
        BookGroupsModule,
    ],
})
export class BooksModule {}
