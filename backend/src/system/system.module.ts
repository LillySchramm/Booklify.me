import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';

@Module({
    providers: [SystemService],
    controllers: [SystemController],
    exports: [SystemService],
    imports: [PrismaModule, S3Module, UsersModule, BooksModule],
})
export class SystemModule {}
