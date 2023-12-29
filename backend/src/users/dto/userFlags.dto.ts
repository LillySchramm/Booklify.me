import { ApiProperty } from '@nestjs/swagger';
import { UserFlags } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserFlagsDto implements UserFlags {
    @Exclude()
    userId: string;
    @Exclude()
    lastAppliedGrouperVersion: number;
    @ApiProperty()
    public: boolean;
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
    @Exclude()
    lastNotifiedChangelogVersion: string;
    @ApiProperty()
    changelogNotificationEnabled: boolean;

    constructor(partial: Partial<UserFlagsDto>) {
        Object.assign(this, partial);
    }
}
