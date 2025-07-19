import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Role, RoleType } from '../domain/roles.entity';

@Injectable()
export class RolesRepository extends DddRepository<Role> {
  entity = Role;

  async find({ id, userId, type }: { id?: number; userId?: string; type?: RoleType }) {
    return this.entityManager.find(this.entity, {
      where: {
        id,
        userId,
        type,
      },
    });
  }
}
