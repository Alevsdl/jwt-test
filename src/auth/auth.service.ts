import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/usert.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string) {
    const user = await this.usersService.findOne(name);
    if (user !== null) {
      const isValid = password === user.password;
      if (isValid) {
        return user;
      }
    }

    return null;
  }

  async generateToken(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
