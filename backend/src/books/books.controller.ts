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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookDto } from './dto/book.dto';
import { BooksService } from './books.service';
import { S3Service } from 'src/s3/s3.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { SetOwnershipStatusDto } from './dto/setOwnershipStatus.dto';
import { isISBN } from 'class-validator';
import { OwnershipStatusDto } from './dto/ownershipStatus.dto';
import { BookListDto } from './dto/bookList.dto';

@Controller('books')
@ApiTags('books')
export class BooksController {
    private readonly logger = new Logger(BooksController.name);

    constructor(
        private readonly bookService: BooksService,
        private readonly s3: S3Service,
    ) {}

    @Get('owned')
    @UseGuards(AuthGuard)
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
    @ApiOkResponse({ type: BookDto })
    async getBook(@Param('isbn') isbn: string) {
        return await this.bookService.getBook(isbn);
    }

    @Post(':isbn/status')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ type: OwnershipStatusDto })
    async setBookOwnershipStatus(
        @Param('isbn') isbn: string,
        @Body() body: SetOwnershipStatusDto,
        @Request() req: any,
    ) {
        const isIsbn = isISBN(isbn);
        if (!isIsbn) throw new BadRequestException();

        const book = await this.bookService.getBook(isbn);
        if (!book) throw new NotFoundException();

        const ownershipStatus = await this.bookService.setBookOwnership(
            req.user,
            book,
            body.status,
        );
        return new OwnershipStatusDto(ownershipStatus);
    }

    @Get(':isbn/status')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ type: OwnershipStatusDto })
    async getBookOwnershipStatus(
        @Param('isbn') isbn: string,
        @Request() req: any,
    ) {
        const isIsbn = isISBN(isbn);
        if (!isIsbn) throw new BadRequestException();

        const book = await this.bookService.getBook(isbn);
        if (!book) throw new NotFoundException();

        const ownershipStatus = await this.bookService.getBookOwnership(
            req.user,
            book,
        );
        return new OwnershipStatusDto(ownershipStatus);
    }

    @Get('cover/:id.png')
    @UseGuards(AuthGuard)
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
