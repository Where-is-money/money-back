import { Module } from '@nestjs/common';
import { AdminRolesConsumer } from './applications/admin-roles.consumer';
import { AdminRolesService } from './applications/admin-roles.service';
import { UsersRepository } from '../users/infrastructure/users.repository';
import { RolesRepository } from './infrastructure/roles.repository';

@Module({
  providers: [AdminRolesConsumer, AdminRolesService, UsersRepository, RolesRepository],
  exports: [AdminRolesService, RolesRepository],
})
export class AdminRolesModule {}
