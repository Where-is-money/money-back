import { Module } from '@nestjs/common';
import { AuthService } from './applications/auth.service';
import { UsersRepository } from '../users/infrastructure/users.repository';
import { AuthController } from './presentation/auth.controller';
import { CommonModule } from '../../common';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
  exports: [AuthService, UsersRepository],
})
export class AuthModule {}
