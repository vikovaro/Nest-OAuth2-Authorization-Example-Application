import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../features/user/repositories/user.repository';

@Injectable()
export class AuthRestGuard implements CanActivate {
    constructor(
        readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        let token = this.extractTokenFromHeader(request);

        if (!token) {
            token = request.cookies?.accessToken;
            if (!token) {
                throw new UnauthorizedException();
            }
        }

        let data;
        try {
            data = await this.jwtService.verifyAsync(token);
        } catch {
            throw new UnauthorizedException('jwt-expired');
        }

        request['data'] = data;
        if (!data.userId) {
            return false;
        }
        const user = await this.userRepository.getUserById(data.userId);
        return !!user;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}
