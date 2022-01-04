import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PRIVATE_KEY } from '../decorators/private.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPrivate = this.reflector.get(IS_PRIVATE_KEY, context.getHandler());
    if (isPrivate) {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.header('Authorization');
      return authHeader === this.configService.get('API_KEY');
    }
    return true;
  }
}
