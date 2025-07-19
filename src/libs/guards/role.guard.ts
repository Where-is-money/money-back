import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@libs/decorators/roles.decorator';
import { RoleType } from '../../services/roles/domain/roles.entity';
import { Context, ContextKey } from '../context';
import { User } from '../../services/users/domain/users.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly context: Context
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user = this.context.get<ContextKey.USER, User>(ContextKey.USER);

    const isAuthorized = requiredRoles.some((role) => role === user.roleType);
    if (!isAuthorized) {
      throw new ForbiddenException('Forbidden', { cause: `User is not authorized.` });
    }

    return true;
  }
}
