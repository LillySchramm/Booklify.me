import {
    BadRequestException,
    Controller,
    Get,
    NotFoundException,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiTags,
} from '@nestjs/swagger';
import { UserWithFlags, UsersService } from './users.service';
import { isUUID } from 'class-validator';
import { BasicUserDto } from './dto/basicUser.dto';
import { AuthGuard, AuthOptional } from 'src/auth/auth.guard';

/**
 * Ensure that data of a user can only be accessed by the user itself or if
 * the user has the public flag set.
 */
export function userCanBeAccessed(user: UserWithFlags, request: any): boolean {
    return (
        user.UserFlags?.public || (request.user && user.id === request.user.id)
    );
}

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBadRequestResponse()
    @ApiBearerAuth()
    @AuthOptional()
    @UseGuards(AuthGuard)
    async getUser(
        @Query('id') id: string,
        @Query('name') name: string,
        @Request() request: any,
    ): Promise<BasicUserDto> {
        if (!id && !name)
            throw new BadRequestException('No id or name provided');
        if (id && name)
            throw new BadRequestException('Provide only id or name');

        let user: UserWithFlags | null = null;
        if (id) {
            if (!isUUID(id)) throw new BadRequestException('Id invalid');
            user = await this.userService.findByIdWithFlags(id.toLowerCase());
        }

        if (name) {
            if (!/^([a-zA-Z\._\-0-9])*$/g.test(name)) {
                throw new BadRequestException('Name invalid');
            }
            user = await this.userService.findByNameWithFlags(name);
        }

        if (!user || !userCanBeAccessed(user, request))
            throw new NotFoundException('User not found');

        return new BasicUserDto(user);
    }
}
