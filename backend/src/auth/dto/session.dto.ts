import { ApiProperty } from '@nestjs/swagger';
import { Session } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SessionDto implements Session {
    @ApiProperty()
    id: string;
    @ApiProperty()
    userId: string;
    @Exclude()
    invalidated: boolean;
    @Exclude()
    updatedAt: Date;
    @ApiProperty()
    name: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    permanent: boolean;
    @Exclude()
    refreshToken: string | null;
    @ApiProperty({ nullable: true, type: Date })
    lastUsed: Date | null;

    constructor(partial: Partial<SessionDto>) {
        Object.assign(this, partial);
    }
}
