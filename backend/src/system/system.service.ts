import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import * as config from 'config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SystemService {
    constructor(
        private prismaService: PrismaService,
        private s3: S3Service,
        private userService: UsersService,
    ) {}

    async checkDatabase(): Promise<boolean> {
        try {
            await this.prismaService.user.findMany({ take: 1 });
        } catch (error) {
            return false;
        }

        return true;
    }

    async checkS3(): Promise<boolean> {
        try {
            await this.s3.listBuckets();
        } catch (error) {
            return false;
        }

        return true;
    }

    async isSignUpDisabled(): Promise<boolean> {
        const disabled = config.get<boolean>('disable_registration');
        const userCount = await this.userService.getUserCount();

        return disabled && userCount !== 0;
    }
}
