import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SecretsModule } from 'src/secrets/secrets.module';
import * as config from 'config';

const TOKEN_EXPIRATION = config.get<string>('security.access_token_expiration');

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            signOptions: {
                expiresIn: TOKEN_EXPIRATION,
                issuer: 'Mangalist',
            },
        }),
        PrismaModule,
        SecretsModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
