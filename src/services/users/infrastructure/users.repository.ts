import { Injectable } from '@nestjs/common';
import { CommonRepository } from '@libs/ddd';
import { User } from '../domain/users.entity';

@Injectable()
export class UsersRepository extends CommonRepository<User> {
  entity = User;
}
