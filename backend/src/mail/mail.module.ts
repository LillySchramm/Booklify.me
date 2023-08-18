import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [MailService],
    exports: [MailService],
    imports: [PrismaModule],
})
export class MailModule {}
