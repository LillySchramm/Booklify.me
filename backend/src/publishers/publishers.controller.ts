import {
    Body,
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { PublishersService } from './publishers.service';
import { PublisherListDto } from './dto/publisherList.dto';
import { GetIdListDto } from 'src/authors/dto/getIdList.dto';
import { PublisherDto } from './dto/publisher.dto';

@Controller('publishers')
@ApiTags('Publishers')
export class PublishersController {
    constructor(private readonly publisherService: PublishersService) {}

    @Post()
    @HttpCode(200)
    @ApiOkResponse({ type: PublisherListDto })
    @ApiBearerAuth()
    async getPublishers(
        @Body() getDto: GetIdListDto,
    ): Promise<PublisherListDto> {
        const publishers = await this.publisherService.getPublishers(
            getDto.ids,
        );

        return new PublisherListDto({
            publishers: publishers.map(
                (publisher) => new PublisherDto(publisher),
            ),
        });
    }

    @Get(':id')
    @ApiOkResponse({ type: PublisherDto })
    @ApiNotFoundResponse()
    @ApiBearerAuth()
    async getPublisher(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<PublisherDto> {
        const publisher = await this.publisherService.getPublisherById(id);
        if (!publisher) throw new NotFoundException("Publisher doesn't exist");

        return new PublisherDto(publisher);
    }
}
