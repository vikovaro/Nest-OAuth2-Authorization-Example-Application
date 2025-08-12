import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { ERole, TRole } from '../../auth/models/role.enum';

export class UpdateUserRequest implements IUpdateUserRequest {
    @ApiProperty({ example: 1 })
    @IsUUID()
    @Min(0)
    userId: number;

    @ApiProperty({ example: 'username' })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(30)
    username: string;

    @ApiProperty({ example: 'name' })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(40)
    name?: string;

    @ApiProperty({ example: '+71112223344' })
    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(15)
    phone?: string;

    @ApiProperty({ example: 'example@gmail.com' })
    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(50)
    email?: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    @IsOptional()
    @MinLength(8)
    @MaxLength(50)
    password?: string;

    @ApiProperty({ enum: ERole })
    @IsOptional()
    @IsEnum(ERole)
    role?: ERole;
}

export interface IUpdateUserRequest {
    userId: number;
    login?: string;
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    role?: TRole;
}
