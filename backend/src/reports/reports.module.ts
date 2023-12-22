import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { AuthModule } from 'src/auth/auth.module';
import { SecretsModule } from 'src/secrets/secrets.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [ReportsService],
    controllers: [ReportsController],
    imports: [UsersModule, MailModule, AuthModule, SecretsModule, PrismaModule],
})
export class ReportsModule {}
