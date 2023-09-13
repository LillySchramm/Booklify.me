import { ApiProperty } from '@nestjs/swagger';
import { Publisher } from '@prisma/client';

export class PublisherDto implements Publisher {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;

    constructor(partial: Partial<PublisherDto>) {
        Object.assign(this, partial);
    }
}
