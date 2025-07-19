import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../infrastructure/users.repository';
import { Transactional } from '@libs/decorators';
import { User } from '../domain/users.entity';
import { UserCreateDto } from '../presentation/dto';

@Injectable()
export class AdminUsersService extends DddService {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  @Transactional()
  async register({ name, email, password }: UserCreateDto) {
    const user = User.of({ name, email, password });

    await this.usersRepository.save([user]);

    return user;
  }
}
