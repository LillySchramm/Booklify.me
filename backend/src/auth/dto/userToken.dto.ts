import { ApiProperty } from '@nestjs/swagger';
import { UserToken } from '../auth.service';

export class UserTokenDto implements UserToken {
    @ApiProperty()
    accessToken: string;

    constructor(partial: Partial<UserToken>) {
        Object.assign(this, partial);
    }
}
