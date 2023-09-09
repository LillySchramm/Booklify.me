import { Injectable } from '@nestjs/common';
import { PasswordResetRequest, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/auth/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import * as config from 'config';
import { randomBytes } from 'crypto';
import { MailService } from 'src/mail/mail.service';

const VERIFICATION_EMAIL_CONTENT = `
<h1>Verify your Booklify Account</h1>
<p>Hey $username, thank you for creating your account.</p>
<p>To complete your signup, please verify your E-Mail by clicking on the link below.</p>
<a href="$host/verify?id=$id&user_id=$userId&key=$key">$host/verify?id=$id&user_id=$userId&key=$key</a>
<p>- Booklify.me</p>
`;

const PASSWORD_RESET_EMAIL_CONTENT = `
<h1>Password Reset</h1>
<p>Hey $username, we have received a password reset request for your account.</p>
<p>To complete reset your password, please click on the link below and follow the instructions shown on the page.</p>
<a href="$host/reset-password?reset_id=$id&user_id=$userId&token=$token">$host/reset-password?reset_id=$id&user_id=$userId&token=$token</a>
<p>If you haven't requested a reset, you should ignore this E-Mail!</p>
<p>- Booklify.me</p>
`;

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mail: MailService,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } },
        });
    }

    async findByIdOrThrow(id: string): Promise<User> {
        return await this.prisma.user.findFirstOrThrow({
            where: { id },
        });
    }

    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: { id },
        });
    }

    async getUserCount(): Promise<number> {
        return await this.prisma.user.count();
    }

    async doesAlreadyExist(email: string, username: string): Promise<boolean> {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { name: { equals: username, mode: 'insensitive' } },
                    { email: { equals: email, mode: 'insensitive' } },
                ],
            },
        });

        return user !== null;
    }

    async validateVerification(
        id: string,
        userId: string,
        key: string,
    ): Promise<boolean> {
        const verificationRequest =
            await this.prisma.verificationEmail.findFirst({
                where: { id, userId, invalidated: false },
            });
        if (!verificationRequest) return false;

        const keyOk = await bcrypt.compare(key, verificationRequest.keyHash);
        if (!keyOk) return false;

        await this.invalidateVerificationsOfUser(userId);
        await this.prisma.user.update({
            data: { activated: true },
            where: { id: userId },
        });

        return true;
    }

    async invalidateVerificationsOfUser(userId: string) {
        await this.prisma.verificationEmail.updateMany({
            data: { invalidated: true },
            where: { userId: userId },
        });
    }

    async createUserVerification(user: User) {
        await this.invalidateVerificationsOfUser(user.id);
        const key = randomBytes(40).toString('hex');
        const keyHash = await bcrypt.hash(key, saltRounds);

        const verificationEmail = await this.prisma.verificationEmail.create({
            data: { keyHash, userId: user.id },
        });

        const emailContent = VERIFICATION_EMAIL_CONTENT.replaceAll(
            '$host',
            config.get<string>('url'),
        )
            .replaceAll('$id', verificationEmail.id)
            .replaceAll('$userId', verificationEmail.userId)
            .replaceAll('$key', key)
            .replaceAll('$username', user.name);

        await this.mail.sendMail(
            `${user.name} <${user.email}>`,
            'Just one last step!',
            emailContent,
        );
    }

    async invalidateResetRequestsOfUser(userId: string) {
        await this.prisma.passwordResetRequest.updateMany({
            data: { invalidated: true },
            where: { userId: userId },
        });
    }

    async resetPassword(
        userId: string,
        resetToken: string,
        resetId: string,
        newPassword: string,
    ): Promise<boolean> {
        const resetRequest = await this.prisma.passwordResetRequest.findFirst({
            where: { id: resetId, userId, invalidated: false },
        });
        if (!resetRequest) return false;

        const keyOk = await bcrypt.compare(resetToken, resetRequest.keyHash);
        if (!keyOk) return false;

        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        await this.invalidateResetRequestsOfUser(userId);
        await this.prisma.user.update({
            data: { password: passwordHash },
            where: { id: userId },
        });

        return true;
    }

    async createPasswordResetRequest(
        user: User,
    ): Promise<{ request: PasswordResetRequest; token: string }> {
        await this.invalidateResetRequestsOfUser(user.id);
        const key = randomBytes(40).toString('hex');
        const keyHash = await bcrypt.hash(key, saltRounds);

        const resetRequest = await this.prisma.passwordResetRequest.create({
            data: { keyHash, userId: user.id },
        });

        const emailContent = PASSWORD_RESET_EMAIL_CONTENT.replaceAll(
            '$username',
            user.name,
        )
            .replaceAll('$host', config.get<string>('url'))
            .replaceAll('$id', resetRequest.id)
            .replaceAll('$userId', resetRequest.userId)
            .replaceAll('$token', key);

        await this.mail.sendMail(
            `${user.name} <${user.email}>`,
            'Password Reset',
            emailContent,
        );

        return { request: resetRequest, token: key };
    }

    async createUser(
        name: string,
        email: string,
        password: string,
    ): Promise<User> {
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const mailEnabled = config.get<boolean>('mail.enabled');

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                activated: !mailEnabled,
            },
        });

        if (mailEnabled) {
            await this.createUserVerification(user);
        }

        return user;
    }
}
