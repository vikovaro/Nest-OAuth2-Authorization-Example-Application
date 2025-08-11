import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { SignUpRequest } from './dto/sign-up.request';
import { AuthService } from './auth.service';
import { SignInRequest } from './dto/sign-in.request';
import { AuthRefreshRestGuard } from './guards/auth-refresh.guad';
import { TokensResponse } from './dto/tokens.response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @ApiResponse({ status: HttpStatus.OK, description: 'register', type: TokensResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokensResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async signUp(@Body() signUpDto: SignUpRequest) {
        return await this.authService.signUp(signUpDto);
    }

    @Post('/login')
    @ApiResponse({ status: HttpStatus.OK, description: 'login', type: TokensResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokensResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async signIn(@Body() signInDto: SignInRequest) {
        return await this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Post('/refresh')
    @UseGuards(AuthRefreshRestGuard)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'getting a pair of the new JWT tokens (access & refresh)',
        type: TokensResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokensResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async refreshToken(@Req() req: Request) {
        return await this.authService.refreshToken(req['data'].token);
    }
}
