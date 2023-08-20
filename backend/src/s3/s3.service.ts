import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';
import * as config from 'config';

@Injectable()
export class S3Service extends Minio.Client implements OnModuleInit {
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
        const bucketExists = await this.bucketExists(this.bucketName);
        if (!bucketExists) {
            await this.makeBucket(this.bucketName, '');
        }
    }
}
