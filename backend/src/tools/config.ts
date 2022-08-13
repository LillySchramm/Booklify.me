import { env } from 'process';

export const SESSION_TIMEOUT_IN_MINUTES =
    Number(env.SESSION_TIMEOUT_IN_MINUTES) || 600;

export const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;

export const PORT = Number(env.PORT) || 8000;
