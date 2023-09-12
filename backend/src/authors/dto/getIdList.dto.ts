import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class GetIdListDto {
    @ApiProperty({ type: String, isArray: true })
    @IsArray()
    @IsUUID('all', { each: true })
    ids: string[];

    constructor(partial: Partial<GetIdListDto>) {
        Object.assign(this, partial);
    }
}
