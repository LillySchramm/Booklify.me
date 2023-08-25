import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SecretsModule } from 'src/secrets/secrets.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            signOptions: {
                expiresIn: '24h',
                algorithm: 'RS256',
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
