import { Module } from '@nestjs/common';
import { ChangelogService } from './changelog.service';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
    providers: [ChangelogService],
    imports: [UsersModule, MailModule],
})
export class ChangelogModule {}
