import * as Minio from 'minio';
import {
    MINIO_ACCESS_KEY,
    MINIO_BUCKET_NAME,
    MINIO_ENDPOINT,
    MINIO_PORT,
    MINIO_SECRET_KEY,
    MINIO_USE_SSL,
} from './config';

export const minioClient = new Minio.Client({
    endPoint: MINIO_ENDPOINT,
    port: MINIO_PORT,
    useSSL: MINIO_USE_SSL,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
});

export async function initializeMinio() {
    const bucketExists = await minioClient.bucketExists(MINIO_BUCKET_NAME);
    if (!bucketExists) {
        await minioClient.makeBucket(MINIO_BUCKET_NAME, '');
    }
}
