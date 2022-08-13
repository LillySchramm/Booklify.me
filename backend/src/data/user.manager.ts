import { User, Session } from '@prisma/client';
import got from 'got';
import { GitHubUserResponse } from '../models/github.model';
import { prisma } from '../server';
import { SESSION_TIMEOUT_IN_MINUTES } from '../tools/config';
import { checkHash, secureHash } from '../tools/hash';
import { getRandomString64 } from '../tools/random';

export async function updateUserInformation(token: string): Promise<User> {
    const userResponse: GitHubUserResponse = await got
        .get('https://api.github.com/user', {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: 'token ' + token,
            },
        })
        .json();

    return prisma.user.upsert({
        where: {
            id: userResponse.id,
        },
        create: {
            id: userResponse.id,
            name: userResponse.name,
        },
        update: {
            name: userResponse.name,
        },
    });
}

export async function newSession(
    userId: number
): Promise<Session & { bearer: string }> {
    const bearer = getRandomString64(512);
    const hash = await secureHash(bearer);

    const session = await prisma.session.create({
        data: {
            key: hash,
            userId: userId,
        },
    });

    const fullToken = Buffer.from(`${session.id}:${bearer}`).toString('base64');

    return { ...session, bearer: fullToken };
}

export async function verifySession(bearer: string): Promise<User | null> {
    if (!bearer.startsWith('Bearer ')) {
        return null;
    }
    let sessionString = bearer.replace('Bearer ', '');
    sessionString = Buffer.from(sessionString, 'base64').toString('utf8');

    const sessionId = sessionString.split(':')[0];
    const sessionKey = sessionString.split(':')[1];

    const session = await prisma.session.findFirst({
        where: { id: sessionId },
        include: { user: true },
    });
    if (!session) {
        return null;
    }

    const timeDelta = Date.now() - session.createdAt.getTime();
    const maxTimeDelta = SESSION_TIMEOUT_IN_MINUTES * 60 * 1000;
    if (timeDelta > maxTimeDelta) {
        return null;
    }

    const keyValid = await checkHash(session.key, sessionKey);
    if (!keyValid) {
        return null;
    }

    return session.user;
}
