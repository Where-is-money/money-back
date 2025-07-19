import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UserCreatedEvent } from '../../users/domain/events';
import { EventHandler, Transactional } from '@libs/decorators';
import { Role } from '../domain/roles.entity';
import { RolesRepository } from '../infrastructure/roles.repository';

@Injectable()
export class AdminRolesService extends DddService {
  constructor(private readonly rolesRepository: RolesRepository) {
    super();
  }

  @EventHandler()
  @Transactional()
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    const { userId, roleType } = event;

    const role = new Role({
      userId,
      type: roleType,
    });

    await this.rolesRepository.save([role]);
  }
}
