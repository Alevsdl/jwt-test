import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'JWTStrategy') {
  constructor(
    private configService: ConfigService,
    private usersService: UserService,
  ) {
    const secretKey = configService.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: secretKey,
    });
  }
  async validate(payload) {
    const user = this.usersService.findOne(payload.sub);
    return user;
  }
}
