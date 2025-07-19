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

  async list() {
    const [users, total] = await Promise.all([
      this.usersRepository.find({}),
      this.usersRepository.count({}),
    ]);

    return { items: users, total };
  }

  @Transactional()
  async register({ name, email, password }: UserCreateDto) {
    const user = User.of({ name, email, password });

    await this.usersRepository.save([user]);

    return user;
  }
}
