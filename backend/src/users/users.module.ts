import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SecretsModule } from 'src/secrets/secrets.module';
import { ChangelogModule } from 'src/changelog/changelog.module';
import { UserTasksService } from './user-tasks.service';

@Module({
    providers: [UsersService, UserTasksService],
    exports: [UsersService],
    imports: [
        PrismaModule,
        MailModule,
        forwardRef(() => AuthModule),
        SecretsModule,
        ChangelogModule,
    ],
    controllers: [UsersController],
})
export class UsersModule {}
