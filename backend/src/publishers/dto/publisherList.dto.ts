import { ApiProperty } from '@nestjs/swagger';
import { PublisherDto } from './publisher.dto';

export class PublisherListDto {
    @ApiProperty({ type: PublisherDto, isArray: true })
    publishers: PublisherDto[];

    constructor(partial: Partial<PublisherListDto>) {
        Object.assign(this, partial);
    }
}
