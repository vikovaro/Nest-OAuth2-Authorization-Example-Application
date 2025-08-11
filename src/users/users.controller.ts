import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { AuthRestGuard } from '../auth/guards/auth-rest.guard';
import { UserService } from './users.service';
import { UserResponse } from 'src/users/dto/user.response';
import { UpdateUserRequest } from './dto/update.request';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    @UseGuards(AuthRestGuard)
    @ApiResponse({ status: HttpStatus.OK, description: 'getMe', type: UserResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: UserResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getMe(@Req() req: Request) {
        return await this.userService.getUserById(req['data'].userId);
    }

    @Post('/update')
    @UseGuards(AuthRestGuard)
    @ApiResponse({ status: HttpStatus.OK, description: 'update user', type: UserResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: UserResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async update(@Req() req: Request, @Body() updateRequest: UpdateUserRequest) {
        return await this.userService.updateUser(updateRequest, req['data'].userId);
    }
}
