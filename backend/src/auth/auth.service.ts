import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Session, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface UserToken {
    accessToken: string;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async signIn(
        email: string,
        password: string,
        clientName: string,
    ): Promise<UserToken> {
        const user = await this.usersService.findByEmail(email);

        if (!user) throw new UnauthorizedException();
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) throw new UnauthorizedException();

        const session = await this.createSession(user.id, clientName);

        return await this.createNewToken(user, session);
    }

    async createNewToken(user: User, session: Session): Promise<UserToken> {
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            jti: session.id,
        };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async createSession(userId: string, name: string): Promise<Session> {
        return await this.prisma.session.create({ data: { userId, name } });
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
}
