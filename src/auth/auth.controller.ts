
import { loginuserdto } from 'src/users/dto/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: loginuserdto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user == null) {
      throw new UnauthorizedException('Hibás email vagy jelszó!');
    }
    if (!await verify(user.password, loginDto.password)) {
      throw new UnauthorizedException('Hibás email vagy jelszó!');
    }

    return {
      token: await this.authService.generateTokenFor(user)
    }
  }
}
