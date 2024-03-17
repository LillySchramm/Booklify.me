import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import * as config from 'config';
import { UsersService } from 'src/users/users.service';
import { sqltag } from '@prisma/client/runtime/library';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class SystemService {
    private readonly logger = new LokiLogger(SystemService.name);

    constructor(
        private prismaService: PrismaService,
        private s3: S3Service,
        private userService: UsersService,
        private bookService: BooksService,
    ) {}

    async checkDatabase(): Promise<boolean> {
        try {
            await this.prismaService.user.findMany({ take: 1 });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            return false;
        }

        return true;
    }

    async checkS3(): Promise<boolean> {
        try {
            await this.s3.listBuckets();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            return false;
        }

        return true;
    }

    async isSignUpDisabled(): Promise<boolean> {
        const disabled = config.get<boolean>('disable_registration');
        const userCount = await this.userService.getUserCount();

        return disabled && userCount !== 0;
    }

    async resetDatabase(): Promise<void> {
        const tables = await this.prismaService.$queryRaw<
            { tablename: string }[]
        >(
            sqltag`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`,
        );

        const tablesToSkip = ['_prisma_migrations', 'Secret'];
        for await (const table of tables) {
            if (tablesToSkip.includes(table.tablename)) continue;

            this.logger.log(`Truncating table ${table.tablename}...`);
            await this.prismaService.$executeRawUnsafe(
                `TRUNCATE TABLE "${table.tablename}" CASCADE`,
            );
        }

        await this.bookService.upsertBook(
            {
                title: 'Test Book',
                authors: ['Test Author'],
                amazonLink: undefined,
                description: 'Test Description',
                language: 'de',
                pageCount: 100,
                printedPageCount: 100,
                subtitle: 'Test Subtitle',
                series: 'Test Series',
                publisher: 'Test Publisher',
            },
            '9783770428601',
            false,
        );

        await this.userService.createUser(
            'test',
            'test@test.de',
            '*wgtpGc3o$uVjW',
            true,
            true,
        );
    }
}
