import { Injectable, OnModuleInit } from '@nestjs/common';
import { Secret } from '@prisma/client';
import * as config from 'config';
import {
    CipherGCM,
    DecipherGCM,
    createCipheriv,
    createDecipheriv,
    createHash,
    randomBytes,
} from 'node:crypto';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';
import { PrismaService } from 'src/prisma/prisma.service';

type SECRET = 'JWT_SECRET' | 'MODE';
const CIPHER_ALGORITHM = 'aes-256-gcm';

@Injectable()
export class SecretsService implements OnModuleInit {
    private readonly logger = new LokiLogger(SecretsService.name);

    private secretKey = config.get<string>('security.key');

    constructor(private prisma: PrismaService) {}

    async onModuleInit() {
        await this.initJwtSecrets();
    }

    async checkMode() {
        const mode = await this._getSecret('MODE');
        if (mode === null || mode.value !== CIPHER_ALGORITHM) {
            this.logger.warn(
                'Mode is not set or is incorrect. Setting to current default. All users will be logged out.',
            );

            await this.clearSecrets();

            await this._setSecret('MODE', CIPHER_ALGORITHM);
        }
    }

    async initJwtSecrets() {
        await this.checkMode();

        const jwtSecret = await this.getSecret('JWT_SECRET');

        if (jwtSecret !== null) {
            this.logger.log('JWT Secrets already exist!');

            return;
        }

        this.logger.log('JWT Secrets did not exist. Creating...');

        const secureRandom = randomBytes(256).toString('hex');
        await this.setSecret('JWT_SECRET', secureRandom);

        this.logger.log('Generated JWT Secrets');
    }

    private async _getSecret(secret: SECRET): Promise<Secret | null> {
        return await this.prisma.secret.findFirst({
            where: { identifier: secret },
        });
    }

    async getSecret(secret: SECRET): Promise<string | null> {
        const secretEntry = await this._getSecret(secret);
        if (secretEntry === null) return null;

        return this.decrypt(secretEntry.value);
    }

    private async _setSecret(secret: SECRET, value: string): Promise<void> {
        await this.prisma.secret.upsert({
            where: { identifier: secret },
            create: { identifier: secret, value },
            update: { value },
        });
    }

    async setSecret(secret: SECRET, value: string): Promise<void> {
        const encryptedValue = this.encrypt(value);
        await this._setSecret(secret, encryptedValue);
    }

    public encrypt(input: string): string {
        const iv = randomBytes(16);
        const key = this.getSecretKeyHash();
        const cipher: CipherGCM = createCipheriv(CIPHER_ALGORITHM, key, iv);

        const encrypted = cipher.update(input, 'utf8', 'hex');
        cipher.final('hex');
        const authTag = cipher.getAuthTag();

        return `${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`;
    }

    public decrypt(input: string): string {
        const textParts = input.split(':');

        const iv = Buffer.from(textParts.shift()!, 'hex');
        const encryptedText = textParts.shift()!;
        const authTag = Buffer.from(textParts.shift()!, 'hex');

        const key = this.getSecretKeyHash();

        const decipher: DecipherGCM = createDecipheriv(
            CIPHER_ALGORITHM,
            key,
            iv,
        );
        decipher.setAuthTag(authTag);

        const decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decipher.final();

        return `${decrypted}`;
    }

    private getSecretKeyHash(): string {
        return createHash('sha256')
            .update(this.secretKey)
            .digest('base64')
            .slice(0, 32);
    }

    private async clearSecrets(): Promise<void> {
        await this.prisma.secret.deleteMany({});
    }
}
