import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../infrastructure/users.repository';
import { Transactional } from '@libs/decorators';
import { User } from '../domain/users.entity';

@Injectable()
export class AdminUsersService extends DddService {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  @Transactional()
  async register() {
    const user = new User({ name: 'test', email: 'test@test.com' });

    await this.usersRepository.save([user]);

    return user;
  }
}
