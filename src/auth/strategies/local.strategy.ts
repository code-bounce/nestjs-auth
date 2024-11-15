import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, password: string) {
    console.log(username, password, 'before check');
    const user = this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      username,
      password,
    };
  }
}
