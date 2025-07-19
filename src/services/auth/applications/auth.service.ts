import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../presentation/dto';

@Injectable()
export class AuthService extends DddService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  async signIn({ email, password }: SignInDto) {
    const [user] = await this.usersRepository.find({ email });

    if (!user) {
      throw new BadRequestException(`email or password is incorrect.`, {
        cause: `${email} is not registered.`,
      });
    }

    user.comparePassword(password, user.password);
    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return { accessToken };
  }
}
