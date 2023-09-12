import {
    Body,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { AuthorListDto } from './dto/authorList.dto';
import { AuthorDto } from './dto/author.dto';
import { GetIdListDto } from './dto/getIdList.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('authors')
@ApiTags('Authors')
export class AuthorsController {
    constructor(private readonly authorService: AuthorsService) {}

    @Post()
    @ApiOkResponse({ type: AuthorListDto })
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getAuthors(@Body() getDto: GetIdListDto): Promise<AuthorListDto> {
        const authors = await this.authorService.getAuthors(getDto.ids);

        return new AuthorListDto({
            authors: authors.map((author) => new AuthorDto(author)),
        });
    }

    @Get(':id')
    @ApiOkResponse({ type: AuthorDto })
    @ApiNotFoundResponse()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getAuthor(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<AuthorDto> {
        const author = await this.authorService.getAuthor(id);
        if (!author) throw new NotFoundException("Author doesn't exist");

        return new AuthorDto(author);
    }
}
