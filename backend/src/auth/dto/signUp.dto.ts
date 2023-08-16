import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty({ example: 'lillychan', maxLength: 25 })
    name: string;
    @ApiProperty({ example: 'me@example.com', maxLength: 50 })
    email: string;
    @ApiProperty({
        example: '*wgtpGc3o$uVjW',
        maxLength: 50,
    })
    password: string;

    constructor(partial: Partial<SignUpDto>) {
        Object.assign(this, partial);
    }
}
