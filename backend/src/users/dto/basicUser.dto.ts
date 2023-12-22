import { UserFlags } from '@prisma/client';
import { UserWithFlags } from '../users.service';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BasicUserDto implements UserWithFlags {
    @Exclude()
    UserFlags: UserFlags | null;
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @Exclude()
    email: string;
    @Exclude()
    password: string;
    @Exclude()
    activated: boolean;
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
    @Exclude()
    agreedTosAt: Date | null;
    @Exclude()
    agreedPrivacyAt: Date | null;
    @Exclude()
    banned: boolean;

    constructor(partial: Partial<BasicUserDto>) {
        Object.assign(this, partial);
    }
}
