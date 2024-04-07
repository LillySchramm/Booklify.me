import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SecretsService } from 'src/secrets/secrets.service';
import { Reflector } from '@nestjs/core';

export const AUTH_IS_OPTIONAL_KEY = 'isOptional';
export const AuthOptional = () => SetMetadata(AUTH_IS_OPTIONAL_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private authService: AuthService,
        private secretService: SecretsService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isOptional = this.reflector.getAllAndOverride<boolean>(
            AUTH_IS_OPTIONAL_KEY,
            [context.getHandler(), context.getClass()],
        );

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            if (isOptional) return true;
            throw new UnauthorizedException();
        }
        try {
            const jwtKey =
                (await this.secretService.getSecret('JWT_SECRET')) ?? '';

            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtKey,
            });

            const session = await this.authService.findValidSession(
                payload.jti,
            );
            if (session === null) throw new UnauthorizedException();

            await this.authService.setLastUsed(session.id);

            const user = await this.userService.findByIdOrThrow(payload.sub);
            if (user.banned) throw new UnauthorizedException();

            request['authToken'] = payload;
            request['session'] = session;
            request['user'] = user;
        } catch {
            if (isOptional) return true;
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
