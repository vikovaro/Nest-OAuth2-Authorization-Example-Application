import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ERole, TRole } from '../../auth/models/role.enum';

export class UserResponse implements IUserResponse {
    @ApiProperty({ example: '4da06a83-abf8-4f00-9423-fc06acd0f21d' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'username' })
    @Expose()
    username: string;

    @ApiProperty({ example: 'name' })
    @Expose()
    name: string;

    @ApiProperty({ example: '+71112223344' })
    @Expose()
    phone: string;

    @ApiProperty({ example: 'example@gmail.com' })
    @Expose()
    email: string;

    @Exclude()
    password: string;

    @ApiProperty({ enum: ERole })
    @Expose()
    role: ERole;

    @ApiProperty()
    @Expose()
    createdAt: Date;
}

export interface IUserResponse {
    id: string;
    username: string;
    name: string;
    phone: string;
    email: string;
    role: TRole;
    createdAt: Date;
}
