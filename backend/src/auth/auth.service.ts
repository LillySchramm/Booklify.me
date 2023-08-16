import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) throw new UnauthorizedException();
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) throw new UnauthorizedException();

        const payload = { sub: user.id, name: user.name, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
