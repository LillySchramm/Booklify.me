import { ApiProperty } from '@nestjs/swagger';

export class SignInSuccessDto {
    @ApiProperty()
    accessToken: string;

    constructor(partial: Partial<SignInSuccessDto>) {
        Object.assign(this, partial);
    }
}
