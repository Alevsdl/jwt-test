import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    const isPublic = this.reflector.get<boolean>(
      'is-public',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    if (authorization !== this.configService.get<string>('SECRET_PASSWORD')) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
