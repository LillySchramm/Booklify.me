import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Logger,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookDto } from './dto/book.dto';
import { BooksService } from './books.service';
import { S3Service } from 'src/s3/s3.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SetOwnershipStatusDto } from './dto/setOwnershipStatus.dto';
import { isISBN } from 'class-validator';
import { OwnershipStatusDto } from './dto/ownershipStatus.dto';
import { BookListDto } from './dto/bookList.dto';
import { BookGroupsService } from 'src/book-groups/bookGroups.service';

@Controller('books')
@ApiTags('books')
export class BooksController {
    private readonly logger = new Logger(BooksController.name);

    constructor(
        private readonly bookService: BooksService,
        private readonly s3: S3Service,
        private readonly bookGroupService: BookGroupsService,
    ) {}

    @Get('owned')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: BookListDto })
    async getAllOwnedBooks(@Request() req: any) {
        const books = await this.bookService.getAllOwnedBooksOfUser(
            req.user.id,
        );
        const bookDtos = books.map((book) => new BookDto(book));

        return new BookListDto({ books: bookDtos });
    }

    @Get(':isbn')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: BookDto })
    async getBook(@Param('isbn') isbn: string, @Request() req: any) {
        const isIsbn = isISBN(isbn);
        if (!isIsbn) throw new BadRequestException();

        isbn = isbn.replaceAll('-', '');

        const book = await this.bookService.getBook(isbn, req.user.id);
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
        );
        return new OwnershipStatusDto(ownershipStatus);
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
