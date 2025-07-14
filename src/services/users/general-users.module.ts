import { Module } from '@nestjs/common';
import { GeneralUsersController } from './presentation';
import { GeneralUsersService } from './applications';
import { UsersRepository } from './infrastructure/users.repository';

@Module({
  imports: [],
  controllers: [GeneralUsersController],
  providers: [GeneralUsersService, UsersRepository],
})
export class GeneralUsersModule {}
