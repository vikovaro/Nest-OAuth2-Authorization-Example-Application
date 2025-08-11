import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpRequest implements ISignUpRequest {
    @ApiProperty({ example: 'username' })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    username: string;

    @ApiProperty({ example: 'name' })
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    name: string;

    @ApiProperty({ example: '+71112223344' })
    @IsString()
    @MinLength(10)
    @MaxLength(15)
    phone: string;

    @ApiProperty({ example: 'example@gmail.com' })
    @IsString()
    @MinLength(10)
    @MaxLength(50)
    email: string;

    @ApiProperty({ example: 'password' })
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    password: string;
}

export interface ISignUpRequest {
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
}
