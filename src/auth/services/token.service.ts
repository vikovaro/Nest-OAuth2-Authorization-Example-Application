import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokensResponse } from '../dto/tokens.response';

@Injectable()
export class TokenService {
    constructor(readonly jwtService: JwtService) {}

    async generateToken(userId: number, role: string): Promise<ITokensResponse> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId,
                    role,
                    type: 'Access',
                    date: Date.now(),
                },
                {
                    expiresIn: '5m',
                },
            ),
            this.jwtService.signAsync(
                {
                    userId,
                    role,
                    type: 'Refresh',
                    date: Date.now(),
                },
                {
                    expiresIn: '30d',
                },
            ),
        ]);

        return { accessToken, refreshToken };
    }
}
