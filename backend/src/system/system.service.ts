import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class SystemService {
    constructor(
        private prismaService: PrismaService,
        private s3: S3Service,
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
}
