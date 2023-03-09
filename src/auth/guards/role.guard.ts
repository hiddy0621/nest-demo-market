import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requestStatuses = this.reflactor.get<string[]>(
      'statuses',
      ctx.getHandler(),
    );
    if (!requestStatuses) {
      return true;
    }
    const { user } = ctx.switchToHttp().getRequest();
    return requestStatuses.some((status) => user.status.includes(status));
  }
}
