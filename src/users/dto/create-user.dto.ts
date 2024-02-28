import { IsEmail, IsNotEmpty, IsStrongPassword, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Min(5)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Min(0)
  @IsStrongPassword()
  password: string;
}
