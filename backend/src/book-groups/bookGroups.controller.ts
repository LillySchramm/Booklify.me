import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
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
import { BookGroupPostDto } from './dto/bookGroupPostDto.dto';
import { BookGroupPatchDto } from './dto/bookGroupPatchDto.dto';
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

        const bookGroups = await this.bookGroupsService.getAllBookGroupsOfUser(
            user.id,
        );
        const bookGroupDtos = bookGroups.map((bookGroup) => {
            return new BookGroupDto(bookGroup);
        });

        return new BookGroupListDto({ groups: bookGroupDtos });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: BookGroupDto })
    @Post()
    async createBookGroup(@Request() req: any, @Body() body: BookGroupPostDto) {
        const bookGroup = await this.bookGroupsService.createBookGroup(
            body.name,
            req.user.id,
        );
        return new BookGroupDto(bookGroup);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: BookGroupDto })
    @Patch(':id')
    async updateBookGroup(
        @Request() req: any,
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: BookGroupPatchDto,
    ) {
        const existingBookGroup = await this.bookGroupsService.getBookGroup(
            id,
            req.user.id,
        );
        if (existingBookGroup === null)
            throw new NotFoundException("Didn't find book group");

        const bookGroup = await this.bookGroupsService.updateBookGroup(
            id,
            body.name,
            req.user.id,
        );
        return new BookGroupDto(bookGroup);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    @Delete(':id')
    async deleteBookGroup(
        @Request() req: any,
        @Param('id', new ParseUUIDPipe()) id: string,
    ) {
        const existingBookGroup = await this.bookGroupsService.getBookGroup(
            id,
            req.user.id,
        );
        if (existingBookGroup === null)
            throw new NotFoundException("Didn't find book group");

        await this.bookGroupsService.deleteBookGroup(id, req.user.id);
    }
}
