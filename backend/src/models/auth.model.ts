import { User } from '@prisma/client';

export interface LoginSuccessResponse {
    bearer: string;
}

export type UserWithSessionId = User & { sessionId: string };
export interface RequestWithUser {
    user: UserWithSessionId;
}

export interface MinimalSession {
    id: string;
    name: string;
    createdAt: Date;
}
