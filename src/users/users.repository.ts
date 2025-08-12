import { Injectable } from '@nestjs/common';
import { IUserResponse } from './dto/user.response';
import { SignUpRequest } from '../auth/dto/sign-up.request';
import { ISession } from '../auth/models/session.model';
import { ERole } from '../auth/models/role.enum';
import { UpdateUserRequest } from './dto/update.request';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    BASE_USER_SELECT = {
        id: true,
        email: true,
        username: true,
        role: true,
        name: true,
        phone: true,
        createdAt: true,
    };

    async getUserById(id: number): Promise<IUserResponse | null> {
        return this.prisma.user.findUnique({
            where: { id: id },
            select: this.BASE_USER_SELECT,
        });
    }

    async getUserByUsername(username: string): Promise<IUserResponse | null> {
        return this.prisma.user.findUnique({
            where: { username: username },
            select: this.BASE_USER_SELECT,
        });
    }

    async getUserWithPassword(id: number) {
        return this.prisma.user.findUnique({
            where: { id: id },
        });
    }

    async createUser(signUpDto: SignUpRequest, password: string): Promise<IUserResponse> {
        return this.prisma.user.create({
            data: {
                username: signUpDto.username,
                name: signUpDto.name,
                email: signUpDto.email,
                phone: signUpDto.phone,
                password: password,
                role: ERole.User,
            },
            select: this.BASE_USER_SELECT,
        });
    }

    async getSessionByRefreshToken(refreshToken: string): Promise<ISession | null> {
        return this.prisma.session.findUnique({
            where: { refreshToken: refreshToken },
        });
    }

    async updateSession(
        userId: number,
        accessToken: string,
        refreshToken: string,
    ): Promise<ISession> {
        return this.prisma.session.upsert({
            where: {
                userId: userId,
            },
            update: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                updatedAt: new Date(),
            },
            create: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async updateUser(updateData: UpdateUserRequest, userId: number): Promise<IUserResponse> {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                username: updateData.username ? updateData.username : undefined,
                name: updateData.name ? updateData.name : undefined,
                phone: updateData.phone ? updateData.phone : undefined,
                email: updateData.email ? updateData.email : undefined,
                password: updateData.password ? updateData.password : undefined,
            },
            select: this.BASE_USER_SELECT,
        });
    }
}
