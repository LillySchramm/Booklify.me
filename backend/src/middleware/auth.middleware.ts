import * as express from 'express';
import { verifySession } from '../data/user.manager';

export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === 'bearer') {
        const bearer = request.headers.authorization;

        if (!bearer) {
            return Promise.reject({});
        }

        const session = await verifySession(bearer);

        if (session) {
            return Promise.resolve({ ...session.user, sessionId: session.id });
        }
    }
    return Promise.reject({});
}
