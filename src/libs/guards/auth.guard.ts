import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../services/users/infrastructure/users.repository';
import { Context, ContextKey } from '../context';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly context: Context,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized', { cause: `There is no token.` });
    }

    const { userId } = await this.jwtService.verifyAsync<{ userId: string }>(token);
    const [user] = await this.usersRepository.find({ id: userId });

    if (!user) {
      throw new UnauthorizedException('Unauthorized', { cause: `User not found.` });
    }

    this.context.set(ContextKey.USER, user);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
