import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SecretsModule } from 'src/secrets/secrets.module';
import * as config from 'config';
import { AuthTasksService } from './auth-tasks.service';
import { RecaptchaService } from './recaptcha/recaptcha.service';

const TOKEN_EXPIRATION = config.get<string>('security.access_token_expiration');

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            signOptions: {
                expiresIn: TOKEN_EXPIRATION,
                issuer: 'Booklify',
                allowInsecureKeySizes: false,
                allowInvalidAsymmetricKeyTypes: false,
                algorithm: 'HS512',
            },
        }),
        PrismaModule,
        SecretsModule,
    ],
    providers: [AuthService, AuthTasksService, RecaptchaService],
    controllers: [AuthController],
    exports: [AuthService, RecaptchaService],
})
export class AuthModule {}
