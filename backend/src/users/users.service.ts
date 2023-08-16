import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { saltRounds } from 'src/auth/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

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

    async getUserCount(): Promise<number> {
        return this.prisma.user.count();
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

        return user != null;
    }

    async createUser(
        name: string,
        email: string,
        password: string,
    ): Promise<User> {
        const passwordHash = await bcrypt.hash(password, saltRounds);

        return await this.prisma.user.create({
            data: { name, email, password: passwordHash },
        });
    }
}
