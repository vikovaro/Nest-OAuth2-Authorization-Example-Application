import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { SignUpRequest } from './dto/sign-up.request';
import { TokensResponse } from './dto/tokens.response';
import * as bcrypt from 'bcryptjs';
import { ERole } from './models/role.enum';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
    private readonly SALT_ROUNDS = 10;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService,
    ) {}

    async signUp(signUpDto: SignUpRequest): Promise<TokensResponse> {
        const existingUser = await this.userRepository.getUserByUsername(signUpDto.username);
        if (existingUser) {
            throw new UnauthorizedException('username-already-taken');
        }

        const hashedPassword = await bcrypt.hash(signUpDto.password, this.SALT_ROUNDS);

        const user = await this.userRepository.createUser(signUpDto, hashedPassword);

        const tokens = await this.tokenService.generateToken(user.id, ERole.User);

        await this.userRepository.updateSession(user.id, tokens.accessToken, tokens.refreshToken);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async signIn(username: string, password: string): Promise<TokensResponse> {
        const user = await this.userRepository.getUserByUsername(username);

        if (!user) {
            throw new NotFoundException('user-not-found');
        }

        const userPassword = (await this.userRepository.getUserWithPassword(user.id)).password;

        const isPasswordValid = await bcrypt.compare(password, userPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('invalid-password');
        }

        const tokens = await this.tokenService.generateToken(user.id, user.role);

        await this.userRepository.updateSession(user.id, tokens.accessToken, tokens.refreshToken);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async refreshToken(refreshToken: string): Promise<TokensResponse> {
        const session = await this.userRepository.getSessionByRefreshToken(refreshToken);
        if (!session) {
            throw new UnauthorizedException();
        }

        const user = await this.userRepository.getUserById(session.userId);

        const tokens = await this.tokenService.generateToken(user.id, user.role);

        await this.userRepository.updateSession(user.id, tokens.accessToken, tokens.refreshToken);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
}
