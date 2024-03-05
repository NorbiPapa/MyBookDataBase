import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(token: string) {
    const user: any = await this.authService.findUserByToken(token);
    if (user == null) {
      throw new UnauthorizedException();
    }
    user.req.token = token;

    // Ha a tokenhez van lejárati idő, azt is itt tudjuk ellenőrizni
    // Pl. "validUntil" oszlop segítségével
    return user;
  }
}
