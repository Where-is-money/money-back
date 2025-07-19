import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigsService } from '@configs';
import { AuthService } from './applications/auth.service';
import { UsersRepository } from '../users/infrastructure/users.repository';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigsService],
      useFactory: (config: ConfigsService) => ({
        secret: config.jwt.secret,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
  exports: [AuthService, UsersRepository],
})
export class AuthModule {}
