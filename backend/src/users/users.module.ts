import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SecretsModule } from 'src/secrets/secrets.module';

@Module({
    providers: [UsersService],
    exports: [UsersService],
    imports: [
        PrismaModule,
        MailModule,
        forwardRef(() => AuthModule),
        SecretsModule,
    ],
    controllers: [UsersController],
})
export class UsersModule {}
