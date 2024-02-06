import { ApiProperty } from '@nestjs/swagger';

export class AmazonDto {
    @ApiProperty()
    referralTag: string;

    constructor(partial: Partial<AmazonDto>) {
        Object.assign(this, partial);
    }
}
