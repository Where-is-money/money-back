import { Module } from '@nestjs/common';
import { AdminRolesConsumer } from './applications/admin-roles.consumer';

@Module({
  controllers: [],
  providers: [AdminRolesConsumer],
})
export class AdminRolesModule {}
