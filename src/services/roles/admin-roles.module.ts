import { Module } from '@nestjs/common';
import { AdminRolesConsumer } from './applications/admin-roles.consumer';
import { AdminRolesService } from './applications/admin-roles.service';

@Module({
  controllers: [],
  providers: [AdminRolesConsumer, AdminRolesService],
})
export class AdminRolesModule {}
