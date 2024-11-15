import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.accessTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
      {
        infer: true,
      },
    )!;

    this.refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
      {
        infer: true,
      },
    )!;
  }

  validateUser(username: string, password: string) {
    return {
      username,
      password,
    };
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '5m',
        secret: this.accessTokenSecret,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: this.refreshTokenSecret,
      }),
    };
  }
}
