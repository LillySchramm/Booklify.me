import {
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookDto } from './dto/book.dto';
import { BooksService } from './books.service';
import { S3Service } from 'src/s3/s3.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('books')
@ApiTags('books')
export class BooksController {
    constructor(
        private readonly bookService: BooksService,
        private readonly s3: S3Service,
    ) {}

    @Get(':isbn')
    @UseGuards(AuthGuard)
    @ApiOkResponse({ type: BookDto })
    async getBook(@Param('isbn') isbn: string) {
        return this.bookService.getBook(isbn);
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
            console.warn('Public image warning: ' + e.message);
            throw new NotFoundException();
        }
    }
}
