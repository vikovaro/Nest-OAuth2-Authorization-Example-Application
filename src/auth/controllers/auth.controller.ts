import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpRequest } from '../dto/sign-up.request';
import { AuthService } from '../services/auth.service';
import { SignInRequest } from '../dto/sign-in.request';
import { AuthRefreshRestGuard } from '../guards/auth-refresh.guad';
import { TokensResponse } from '../dto/tokens.response';
import type { Request, Response } from 'express';

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
    async signUp(@Body() signUpDto: SignUpRequest, @Res() res: Response) {
        return await this.authService.signUp(signUpDto, res);
    }

    @Post('/login')
    @ApiResponse({ status: HttpStatus.OK, description: 'login', type: TokensResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokensResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async signIn(@Body() signInDto: SignInRequest, @Res() res: Response) {
        return await this.authService.signIn(signInDto.username, signInDto.password, res);
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
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        return await this.authService.refreshToken(req['data'].token, res);
    }
}
