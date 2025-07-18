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
  async register({ name, email, password, roleType }: UserCreateDto) {
    const user = new User({
      name,
      email,
      password,
      roleType,
    });

    await this.usersRepository.save([user]);

    return user;
  }
}
