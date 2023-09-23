import { Module } from '@nestjs/common';
import { BookGroupsService } from './bookGroups.service';
import { BookGroupsController } from './bookGroups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SecretsModule } from 'src/secrets/secrets.module';
import { BookGroupingService } from './bookGrouping.service';

@Module({
    providers: [BookGroupsService, BookGroupingService],
    controllers: [BookGroupsController],
    exports: [BookGroupsService, BookGroupingService],
    imports: [
        PrismaModule,
        UsersModule,
        AuthModule,
        SecretsModule,
        UsersModule,
    ],
})
export class BookGroupsModule {}
