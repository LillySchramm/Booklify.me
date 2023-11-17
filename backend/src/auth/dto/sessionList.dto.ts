import { ApiProperty } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class SessionListDto {
    @ApiProperty({ type: [SessionDto] })
    sessions: SessionDto[];

    constructor(partial: Partial<SessionListDto>) {
        Object.assign(this, partial);
    }
}
