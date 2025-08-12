import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { UserRepository } from '../users/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '30m',
                },
                global: true,
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, TokenService, UserRepository, PrismaService],
})
export class AuthModule {}
