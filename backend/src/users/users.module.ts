import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
    providers: [UsersService],
    exports: [UsersService],
    imports: [PrismaModule, MailModule],
})
export class UsersModule {}
