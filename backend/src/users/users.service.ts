import { Injectable, OnModuleInit } from '@nestjs/common';
import { PasswordResetRequest, User, UserFlags } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/auth/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import * as config from 'config';
import { randomBytes } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { GROUPING_VERSION } from 'src/book-groups/bookGrouping.service';
import { LokiLogger } from 'src/loki/loki-logger/loki-logger.service';

export type UserWithFlags = {
    UserFlags: UserFlags | null;
} & User;

@Injectable()
export class UsersService implements OnModuleInit {
    private readonly logger = new LokiLogger(UsersService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly mail: MailService,
    ) {}

    async onModuleInit() {
        await this.addFlagsToAllUsers();
    }

    async addFlagsToAllUsers() {
        const users = await this.prisma.user.findMany({
            select: { id: true },
            where: { UserFlags: { is: null } },
        });

        for await (const user of users) {
            await this.prisma.userFlags.create({
                data: { userId: user.id },
            });

            this.logger.log('Added flags to user ' + user.id);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                email: { equals: email, mode: 'insensitive' },
                banned: false,
            },
        });
    }

    async findByIdOrThrow(id: string): Promise<User> {
        return await this.prisma.user.findFirstOrThrow({
            where: { id, banned: false },
        });
    }

    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: { id, banned: false },
        });
    }

    async findByIdWithFlags(id: string): Promise<UserWithFlags | null> {
        return await this.prisma.user.findFirst({
            where: { id, activated: true, banned: false },
            include: { UserFlags: true },
        });
    }

    async findByNameWithFlags(name: string): Promise<UserWithFlags | null> {
        return await this.prisma.user.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                activated: true,
                banned: false,
            },
            include: { UserFlags: true },
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

    async banUser(userId: string): Promise<void> {
        const user = await this.findById(userId);
        if (!user) return;
        await this.prisma.user.update({
            data: { banned: true },
            where: { id: userId },
        });

        await this.mail.sendMail(
            `${user.name} <${user.email}>`,
            'Account Banned',
            'BAN',
            {
                USERNAME: user.name,
                EMAIL: config.get<string>('reports.contact_email'),
            },
        );
    }

    async validateVerification(
        id: string,
        user: User,
        key: string,
    ): Promise<boolean> {
        const userId = user.id;

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

        await this.mail.sendMail(
            `${user.name} <${user.email}>`,
            'Welcome to Booklify!',
            'FIRST_STEPS',
            {
                USERNAME: user.name,
            },
        );

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

        await this.mail.sendMail(
            `${user.name} <${user.email}>`,
            'Just one last step!',
            'VERIFICATION',
            {
                HOST: config.get<string>('url'),
                ID: verificationEmail.id,
                USER_ID: verificationEmail.userId,
                KEY: key,
                USERNAME: user.name,
            },
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

        await this.mail.sendMail(
            `${user.name} <${user.email}>`,
            'Password Reset',
            'PASSWORD_RESET',
            {
                HOST: config.get<string>('url'),
                ID: resetRequest.id,
                USER_ID: resetRequest.userId,
                TOKEN: key,
                USERNAME: user.name,
            },
        );

        return { request: resetRequest, token: key };
    }

    async createUser(
        name: string,
        email: string,
        password: string,
        agreedTos: boolean,
        agreedPrivacy: boolean,
    ): Promise<User> {
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const mailEnabled = config.get<boolean>('mail.enabled');

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                activated: !mailEnabled,
                UserFlags: { create: {} },
                agreedTosAt: agreedTos ? new Date() : null,
                agreedPrivacyAt: agreedPrivacy ? new Date() : null,
            },
        });

        if (mailEnabled) {
            await this.createUserVerification(user);
        }

        return user;
    }

    async getUserWithOutdatedGroupingFlag(): Promise<User | null> {
        return await this.prisma.user.findFirst({
            where: {
                UserFlags: {
                    lastAppliedGrouperVersion: { lt: GROUPING_VERSION },
                },
                banned: false,
            },
        });
    }

    async updateUserGroupingVersionFlag(
        userId: string,
        version: number,
    ): Promise<void> {
        await this.prisma.userFlags.update({
            data: { lastAppliedGrouperVersion: version },
            where: { userId },
        });
    }

    async deleteUser(userId: string): Promise<void> {
        await this.prisma.user.delete({ where: { id: userId } });
    }

    async exportUserData(userId: string): Promise<any> {
        const user = await this.prisma.user.findFirst({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                UserFlags: {
                    select: {
                        public: true,
                        lastAppliedGrouperVersion: true,
                    },
                },
                BookGroup: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                OwnershipStatus: {
                    select: {
                        bookIsbn: true,
                        bookGroupId: true,
                        status: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                VerificationEmail: {
                    select: {
                        createdAt: true,
                        updatedAt: true,
                        id: true,
                    },
                },
                Session: {
                    select: {
                        createdAt: true,
                        updatedAt: true,
                        id: true,
                        name: true,
                        invalidated: true,
                    },
                },
            },
        });

        return user;
    }

    async getUserFlags(userId: string): Promise<UserFlags | null> {
        return await this.prisma.userFlags.findFirst({
            where: { userId },
        });
    }

    async setUserFlags(
        userId: string,
        flags: Partial<UserFlags>,
    ): Promise<UserFlags | null> {
        return await this.prisma.userFlags.update({
            data: flags,
            where: { userId },
        });
    }

    async changePassword(
        userId: string,
        oldPassword: string,
        newPassword: string,
    ): Promise<boolean> {
        const user = await this.findByIdOrThrow(userId);
        const passwordOk = await bcrypt.compare(oldPassword, user.password);
        if (!passwordOk) return false;

        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        await this.prisma.user.update({
            data: { password: passwordHash },
            where: { id: userId },
        });

        return true;
    }

    async getAllUserIdsWithBook(isbn: string): Promise<string[]> {
        const owners = await this.prisma.ownershipStatus.findMany({
            where: { bookIsbn: isbn, status: 'OWNED' },
            select: { userId: true },
        });

        return owners.map((owner) => owner.userId);
    }
}
