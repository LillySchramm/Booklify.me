import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SecretsService } from 'src/secrets/secrets.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private authService: AuthService,
        private secretService: SecretsService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const publicKey = await this.secretService.getSecret('JWT_PUBLIC');

            const payload = await this.jwtService.verifyAsync(token, {
                publicKey: publicKey || '',
            });
            const session = await this.authService.findValidSession(
                payload.jti,
            );
            if (session === null) throw new UnauthorizedException();

            request['authToken'] = payload;
            request['session'] = session;
            request['user'] = await this.userService.findByIdOrThrow(
                payload.id,
            );
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
