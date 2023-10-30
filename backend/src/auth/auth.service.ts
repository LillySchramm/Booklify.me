import {
    Injectable,
    PreconditionFailedException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as config from 'config';
import { Session, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SecretsService } from 'src/secrets/secrets.service';
import { randomBytes } from 'node:crypto';
import { saltRounds } from './constants';

export interface UserToken {
    accessToken: string;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        private secretService: SecretsService,
    ) {}

    async signIn(
        email: string,
        password: string,
        clientName: string,
        permanent: boolean,
    ): Promise<UserToken> {
        const user = await this.usersService.findByEmail(email);

        if (!user) throw new UnauthorizedException();
        if (!user.activated) throw new PreconditionFailedException();

        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) throw new UnauthorizedException();

        const session = await this.createSession(
            user.id,
            clientName,
            permanent,
        );

        return await this.createNewToken(user, session);
    }

    async setRefreshToken(sessionId: string): Promise<string> {
        const refreshToken = randomBytes(40).toString('hex');
        const refreshTokenHash = await bcrypt.hash(refreshToken, saltRounds);

        await this.prisma.session.update({
            data: { refreshToken: refreshTokenHash },
            where: { id: sessionId },
        });

        return refreshToken;
    }

    async verifyRefreshToken(
        sessionId: string,
        refreshToken: string,
    ): Promise<Session> {
        const session = await this.findValidSession(sessionId);
        if (!session || !session.permanent || !session.refreshToken)
            throw new UnauthorizedException();

        const refreshTokenOk = await bcrypt.compare(
            refreshToken,
            session.refreshToken,
        );
        if (!refreshTokenOk) throw new UnauthorizedException();

        return session;
    }

    async createNewToken(user: User, session: Session): Promise<UserToken> {
        const privateKey = await this.secretService.getSecret('JWT_PRIVATE');

        let refreshToken = null;
        if (session.permanent) {
            refreshToken = await this.setRefreshToken(session.id);
        }

        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            jti: session.id,
            refreshToken,
        };
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                algorithm: 'RS512',
                privateKey: privateKey || '',
            }),
        };
    }

    async createSession(
        userId: string,
        name: string,
        permanent: boolean,
    ): Promise<Session> {
        return await this.prisma.session.create({
            data: { userId, name, permanent },
        });
    }

    async invalidateSession(sessionId: string): Promise<void> {
        await this.prisma.session.update({
            data: { invalidated: true },
            where: { id: sessionId },
        });
    }

    async findValidSession(sessionId: string): Promise<Session | null> {
        return await this.prisma.session.findFirst({
            where: { id: sessionId, invalidated: false },
        });
    }

    async setLastUsed(sessionId: string): Promise<void> {
        await this.prisma.session.update({
            data: { lastUsed: new Date() },
            where: { id: sessionId },
        });
    }

    async invalidateExpiredSessions(): Promise<number> {
        const expirationTime = config.get<number>(
            'security.max_session_idle_days',
        );
        const expirationDate = new Date(
            Date.now() - 24 * 60 * 60 * 1000 * expirationTime,
        );

        const result = await this.prisma.session.updateMany({
            data: { invalidated: true },
            where: {
                lastUsed: { lte: expirationDate },
                invalidated: false,
                permanent: true,
            },
        });

        return result.count;
    }

    async invalidateAllSessionsOfUser(userId: string): Promise<number> {
        const result = await this.prisma.session.updateMany({
            data: { invalidated: true },
            where: { userId },
        });

        return result.count;
    }

    async invalidateOldNonPermanentSessions(): Promise<number> {
        const expirationTime = config.get<number>(
            'security.max_temp_session_age_days',
        );
        const expirationDate = new Date(
            Date.now() - 24 * 60 * 60 * 1000 * expirationTime,
        );

        const result = await this.prisma.session.updateMany({
            data: { invalidated: true },
            where: {
                lastUsed: { lte: expirationDate },
                permanent: false,
                invalidated: false,
            },
        });

        return result.count;
    }
}
