import { ApiProperty } from '@nestjs/swagger';

export class SetOwnershipFlagsDto {
    @ApiProperty()
    isbns: string[];

    @ApiProperty({ type: Boolean, required: false })
    hidden: boolean | undefined;

    @ApiProperty({ type: Boolean, required: false })
    noGroup: boolean | undefined;

    @ApiProperty({ type: Boolean, required: false })
    favorite: boolean | undefined;

    constructor(partial: Partial<SetOwnershipFlagsDto>) {
        Object.assign(this, partial);
    }
}
