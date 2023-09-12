import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SecretsModule } from 'src/secrets/secrets.module';

@Module({
    providers: [AuthorsService],
    controllers: [AuthorsController],
    exports: [AuthorsService],
    imports: [PrismaModule, UsersModule, AuthModule, SecretsModule],
})
export class AuthorsModule {}
