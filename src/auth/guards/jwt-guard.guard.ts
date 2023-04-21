import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/user/entities/usert.entity';

@Injectable()
export class JwtGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest<Request>().user as User;
    console.log(user);
    if (user.userType === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
