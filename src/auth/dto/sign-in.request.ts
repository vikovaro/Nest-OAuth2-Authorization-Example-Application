import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInRequest implements ISignInRequest {
    @ApiProperty({ example: 'username' })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    username: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    password: string;
}

export interface ISignInRequest {
    username: string;
    password: string;
}
