import {
    Controller,
    Get,
    NotFoundException,
    ParseUUIDPipe,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard, AuthOptional } from 'src/auth/auth.guard';
import { BookGroupsService } from './bookGroups.service';
import { BookGroupDto } from './dto/bookGroupDto.dto';
import { BookGroupListDto } from './dto/bookGroupListDto.dto';
import { UsersService } from 'src/users/users.service';
import { userCanBeAccessed } from 'src/users/users.controller';

@ApiTags('book-groups')
@Controller('book-groups')
export class BookGroupsController {
    constructor(
        private readonly bookGroupsService: BookGroupsService,
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(AuthGuard)
    @AuthOptional()
    @ApiBearerAuth()
    @ApiOkResponse({ type: BookGroupListDto })
    @ApiNotFoundResponse()
    @Get()
    async getAllBookGroups(
        @Request() req: any,
        @Query('id', ParseUUIDPipe) id: string,
    ) {
        const user = await this.usersService.findByIdWithFlags(id);
        if (!user || !userCanBeAccessed(user, req))
            throw new NotFoundException();

        const includeHidden = !!req.user && req.user.id === user.id;
        const bookGroups = await this.bookGroupsService.getAllBookGroupsOfUser(
            user.id,
            includeHidden,
        );
        const bookGroupDtos = bookGroups.map((bookGroup) => {
            return new BookGroupDto(bookGroup);
        });

        return new BookGroupListDto({ groups: bookGroupDtos });
    }
}
