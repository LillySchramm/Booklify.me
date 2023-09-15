import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';
import * as config from 'config';

@Injectable()
export class S3Service extends Minio.Client implements OnModuleInit {
    private readonly logger = new Logger(S3Service.name);
    public bucketName: string;

    constructor() {
        super({
            endPoint: config.get<string>('s3.endpoint'),
            port: config.get<number>('s3.port'),
            useSSL: config.get<boolean>('s3.use_ssl'),
            accessKey: config.get<string>('s3.access_key'),
            secretKey: config.get<string>('s3.secret_key'),
        });

        this.bucketName = config.get<string>('s3.bucket_name');
    }

    async onModuleInit() {
        this.logger.log('Checking S3 config...');
        const bucketExists = await this.bucketExists(this.bucketName);

        if (!bucketExists) {
            this.logger.log('Bucket does not exist. Creating...');
            await this.makeBucket(this.bucketName, '');
        }

        this.logger.log('S3 config valid!');
    }
}
