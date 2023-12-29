import { Module } from '@nestjs/common';
import { ChangelogService } from './changelog.service';
import { MailModule } from 'src/mail/mail.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [ChangelogService],
    imports: [PrismaModule, MailModule],
    exports: [ChangelogService],
})
export class ChangelogModule {}
