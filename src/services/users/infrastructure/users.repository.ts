import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { User } from '../domain/users.entity';
import { RoleType } from '../../roles/domain/roles.entity';

@Injectable()
export class UsersRepository extends DddRepository<User> {
  entity = User;

  async find({ id, email, roleType }: { id?: string; email?: string; roleType?: RoleType }) {
    return this.entityManager.find(this.entity, {
      where: {
        id,
        email,
        roleType,
      },
    });
  }

  async count({ id, email, roleType }: { id?: string; email?: string; roleType?: RoleType }) {
    return this.entityManager.count(this.entity, {
      where: {
        id,
        email,
        roleType,
      },
    });
  }
}
