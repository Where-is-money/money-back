import { Module } from '@nestjs/common';
import { GeneralUsersModule } from './users/general-users.module';

@Module({
  imports: [GeneralUsersModule],
})
export class GeneralsModule {}
