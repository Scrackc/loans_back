import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    adress: string;

    @IsString()
    role: string;
}
