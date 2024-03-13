import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsOptional()
  role?: string;
}
