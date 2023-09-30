import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class UserDto implements User {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @Exclude()
    password: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    activated: boolean;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
