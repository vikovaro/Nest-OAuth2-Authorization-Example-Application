import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ERole } from '../models/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        try {
            request['data'] = await this.jwtService.verifyAsync(token!);
        } catch (error) {
            throw new UnauthorizedException();
        }
        if (!request['data']) {
            throw new UnauthorizedException();
        }
        const isHasAccess = requiredRoles.some((role) => request['data'].role?.includes(role));
        if (!isHasAccess) {
            throw new ForbiddenException('no-rights');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
