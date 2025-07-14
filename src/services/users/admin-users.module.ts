import { Module } from '@nestjs/common';
import { UsersRepository } from './infrastructure/users.repository';
import { AdminUsersController } from './presentation';
import { AdminUsersService } from './applications';

@Module({
  imports: [],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, UsersRepository],
})
export class AdminUsersModule {}
