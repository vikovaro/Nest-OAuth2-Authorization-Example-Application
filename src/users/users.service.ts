import { ERole } from 'src/auth/models/role.enum';
import { UpdateUserRequest } from './dto/update.request';
import { IUserResponse } from './dto/user.response';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
    private readonly SALT_ROUNDS = 10;

    constructor(private readonly userRepository: UserRepository) {}

    async getUserById(id: number): Promise<IUserResponse> {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundException('user-not-found');
        }

        return user;
    }

    async updateUser(updateRequest: UpdateUserRequest, userId: number): Promise<IUserResponse> {
        const existingUser = await this.userRepository.getUserById(updateRequest.userId);
        if (!existingUser) {
            throw new NotFoundException('user-not-found');
        }

        const requestOwner = await this.userRepository.getUserById(userId);

        if (updateRequest.userId !== userId && requestOwner!.role !== ERole.Admin) {
            throw new ForbiddenException('no-rights');
        }

        if (updateRequest.role && requestOwner!.role !== ERole.Admin) {
            throw new ForbiddenException('no-rights-for-updating-user-role');
        }

        if (updateRequest.password) {
            updateRequest.password = await bcrypt.hash(updateRequest.password, this.SALT_ROUNDS);
        }

        if (updateRequest.username && updateRequest.username !== existingUser.username) {
            const userWithSameUsername = await this.userRepository.getUserByUsername(
                updateRequest.username,
            );
            if (userWithSameUsername) {
                throw new BadRequestException('username-already-taken');
            }
        }

        return await this.userRepository.updateUser(updateRequest, userId);
    }
}
