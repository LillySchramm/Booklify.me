import { Module } from '@nestjs/common';
import { BookGroupsService } from './bookGroups.service';
import { BookGroupsController } from './bookGroups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SecretsModule } from 'src/secrets/secrets.module';

@Module({
    providers: [BookGroupsService],
    controllers: [BookGroupsController],
    exports: [BookGroupsService],
    imports: [PrismaModule, UsersModule, AuthModule, SecretsModule],
})
export class BookGroupsModule {}
