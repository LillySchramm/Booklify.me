import { env } from 'process';

export const SESSION_TIMEOUT_IN_MINUTES =
    Number(env.SESSION_TIMEOUT_IN_MINUTES) || 600;

export const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

export const PORT = Number(env.PORT) || 8000;

export const MINIO_BUCKET_NAME = env.MINIO_BUCKET_NAME || 'mangalist';
export const MINIO_ENDPOINT = env.MINIO_ENDPOINT || '';
export const MINIO_PORT = Number(env.MINIO_PORT) || 9000;
export const MINIO_ACCESS_KEY = env.MINIO_ACCESS_KEY || '';
export const MINIO_SECRET_KEY = env.MINIO_SECRET_KEY || '';
export const MINIO_USE_SSL = env.MINIO_USE_SSL === 'true';
