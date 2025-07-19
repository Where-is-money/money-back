import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../services/users/infrastructure/users.repository';
import { Context, ContextKey } from '../context';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@libs/decorators/public.decorator';
import { ConfigsService } from '@configs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly context: Context,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly reflector: Reflector,
    private readonly configsService: ConfigsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('There is no token', { cause: `Unauthorized` });
    }

    const { userId } = await this.jwtService.verifyAsync<{ userId: string }>(token, {
      secret: this.configsService.jwt.secret,
    });

    const [user] = await this.usersRepository.find({ id: userId });

    if (!user) {
      throw new UnauthorizedException('User not found', { cause: `Unauthorized` });
    }

    this.context.set(ContextKey.USER, user);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
