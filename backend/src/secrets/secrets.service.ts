import { Injectable, OnModuleInit } from '@nestjs/common';
import * as config from 'config';
import {
    createCipheriv,
    createDecipheriv,
    createHash,
    generateKeyPairSync,
    randomBytes,
} from 'node:crypto';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';
import { PrismaService } from 'src/prisma/prisma.service';

type SECRET = 'JWT_PUBLIC' | 'JWT_PRIVATE';

@Injectable()
export class SecretsService implements OnModuleInit {
    private readonly logger = new LokiLogger(SecretsService.name);

    private secretKey = config.get<string>('security.key');

    constructor(private prisma: PrismaService) {}

    async onModuleInit() {
        await this.initJwtSecrets();
    }

    async initJwtSecrets() {
        const privateKey = await this.getSecret('JWT_PRIVATE');
        const publicKey = await this.getSecret('JWT_PUBLIC');

        if (privateKey !== null && publicKey !== null) {
            this.logger.log('JWT Secrets already exist!');

            return;
        }

        this.logger.log('JWT Secrets did not exist. Creating...');
        const keyPair = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        this.setSecret('JWT_PUBLIC', keyPair.publicKey);
        this.setSecret('JWT_PRIVATE', keyPair.privateKey);
        this.logger.log('Generated JWT Secrets');
    }

    async getSecret(secret: SECRET): Promise<string | null> {
        const secretEntry = await this.prisma.secret.findFirst({
            where: { identifier: secret },
        });
        if (secretEntry === null) return null;

        return this.decrypt(secretEntry.value);
    }

    async setSecret(secret: SECRET, value: string): Promise<void> {
        const encryptedValue = this.encrypt(value);
        await this.prisma.secret.upsert({
            where: { identifier: secret },
            create: { identifier: secret, value: encryptedValue },
            update: { value: encryptedValue },
        });
    }

    public encrypt(input: string): string {
        const iv = randomBytes(16);
        const key = this.getSecretKeyHash();
        const cipher = createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(input);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    public decrypt(input: string): string {
        const textParts = input.split(':');
        const iv = Buffer.from(textParts.shift()!, 'hex');

        const encryptedData = Buffer.from(textParts.join(':'), 'hex');
        const key = this.getSecretKeyHash();
        const decipher = createDecipheriv('aes-256-cbc', key, iv);

        const decrypted = decipher.update(encryptedData);
        const decryptedText = Buffer.concat([decrypted, decipher.final()]);

        return decryptedText.toString();
    }

    public getSecretKeyHash(): string {
        return createHash('sha256')
            .update(this.secretKey)
            .digest('base64')
            .slice(0, 32);
    }
}
