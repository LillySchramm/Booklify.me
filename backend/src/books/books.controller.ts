import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Query,
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { BookDto } from './dto/book.dto';
import { BooksService } from './books.service';
import { S3Service } from 'src/s3/s3.service';
import { Response } from 'express';
import { AuthGuard, AuthOptional } from 'src/auth/auth.guard';
import { SetOwnershipStatusDto } from './dto/setOwnershipStatus.dto';
import { isISBN } from 'class-validator';
import { OwnershipStatusDto } from './dto/ownershipStatus.dto';
import { BookListDto } from './dto/bookList.dto';
import { BookGroupsService } from 'src/book-groups/bookGroups.service';
import { UsersService } from 'src/users/users.service';
import { userCanBeAccessed } from 'src/users/users.controller';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';
import { SetOwnershipFlagsDto } from './dto/setOwnershipFlags.dto';

@Controller('books')
@ApiTags('books')
export class BooksController {
    private readonly logger = new LokiLogger(BooksController.name);

    constructor(
        private readonly bookService: BooksService,
        private readonly s3: S3Service,
        private readonly bookGroupService: BookGroupsService,
        private readonly usersService: UsersService,
    ) {}

    @Get('owned')
    @UseGuards(AuthGuard)
    @AuthOptional()
    @ApiBearerAuth()
    @ApiOkResponse({ type: BookListDto })
    @ApiNotFoundResponse()
    async getAllOwnedBooks(
        @Request() req: any,
        @Query('id', ParseUUIDPipe) id: string,
    ) {
        const user = await this.usersService.findByIdWithFlags(id);
        if (!user || !userCanBeAccessed(user, req))
            throw new NotFoundException();

        const includeHidden = !!req.user && id === req.user.id;
        const books = await this.bookService.getAllOwnedBooksOfUser(
            user.id,
            includeHidden,
        );
        const bookDtos = books.map((book) => new BookDto(book));

        return new BookListDto({ books: bookDtos });
    }

    @Get(':isbn')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: BookDto })
    @ApiNotFoundResponse()
    @ApiQuery({ name: 'skipCrawl', required: false, type: Boolean })
    async getBook(
        @Param('isbn') isbn: string,
        @Request() req: any,
        @Query('skipCrawl') skipCrawl?: string,
    ) {
        const isIsbn = isISBN(isbn);
        if (!isIsbn) throw new BadRequestException();

        isbn = isbn.replaceAll(/\D/g, '');

        if (skipCrawl === undefined) skipCrawl = 'false';
        const _skipCrawl = skipCrawl.toLowerCase() === 'true';

        isbn = isbn.replaceAll('-', '').trim();

        const book = await this.bookService.getBook(
            isbn,
            req.user.id,
            !_skipCrawl,
        );
        if (!book) throw new NotFoundException();

        return new BookDto(book);
    }

    @Post(':isbn/status')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: OwnershipStatusDto })
    async setBookOwnershipStatus(
        @Param('isbn') isbn: string,
        @Body() body: SetOwnershipStatusDto,
        @Request() req: any,
    ) {
        const isIsbn = isISBN(isbn);
        if (!isIsbn) throw new BadRequestException();

        const book = await this.bookService.getBook(isbn, req.user.id);
        if (!book) throw new NotFoundException();

        if (body.bookGroupId !== null) {
            const bookGroup = await this.bookGroupService.getBookGroup(
                body.bookGroupId,
                req.user.id,
            );
            if (!bookGroup)
                throw new NotFoundException("Book group doesn't exist");
        }

        const ownershipStatus = await this.bookService.setBookOwnership(
            req.user,
            book,
            body.status,
            body.bookGroupId,
            body.hidden,
            body.noGroup,
        );
        return new OwnershipStatusDto(ownershipStatus);
    }

    @Post('status')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse()
    async setBookOwnershipFlags(
        @Body() body: SetOwnershipFlagsDto,
        @Request() req: any,
    ) {
        const anyIsbnInvalid = body.isbns.some((b) => !isISBN(b));
        if (anyIsbnInvalid) throw new BadRequestException();

        const count = await this.bookService.setMultipleBookOwnershipStatus(
            body.isbns,
            body.hidden,
            body.noGroup,
            body.favorite,
            req.user.id,
        );

        return { count };
    }

    @Get(':isbn/status')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: OwnershipStatusDto })
    async getBookOwnershipStatus(
        @Param('isbn') isbn: string,
        @Request() req: any,
    ) {
        const isIsbn = isISBN(isbn);
        if (!isIsbn) throw new BadRequestException();

        const book = await this.bookService.getBook(isbn, req.user.id);
        if (!book) throw new NotFoundException();

        const ownershipStatus = await this.bookService.getBookOwnership(
            req.user,
            book,
        );
        return new OwnershipStatusDto(ownershipStatus);
    }

    @Get('cover/:id.png')
    async getBookCover(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Res() res: Response,
    ) {
        try {
            const imageData = await this.s3.getObject(
                this.s3.bucketName,
                'thumbnails/' + id + '.png',
            );
            imageData.on('data', (chunk) => res.write(chunk));
            imageData.on('close', () => res.end());
            res.status(200);
            return;
        } catch (e: any) {
            this.logger.warn('Public image warning: ' + e.message);
            throw new NotFoundException();
        }
    }
}
