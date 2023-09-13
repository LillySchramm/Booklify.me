import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { SecretsModule } from 'src/secrets/secrets.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [PublishersService],
    controllers: [PublishersController],
    exports: [PublishersService],
    imports: [PrismaModule, UsersModule, AuthModule, SecretsModule],
})
export class PublishersModule {}
