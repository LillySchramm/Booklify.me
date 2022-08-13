import { Session, User } from '@prisma/client';

export interface LoginSuccessResponse {
    bearer: string;
}
