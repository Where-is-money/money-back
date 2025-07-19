import { Module } from '@nestjs/common';
import { EventDispatcher } from './event-dispatcher';
import { EventBox } from '@libs/ddd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import queue from './event-dispatcher/queue';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ConfigsService } from '@configs';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventBox]),
    BullModule.registerQueue(...queue),
    EventEmitterModule.forRoot(),
    JwtModule.registerAsync({
      inject: [ConfigsService],
      useFactory: (config: ConfigsService) => ({
        secret: config.jwt.secret,
      }),
    }),
  ],
  providers: [EventDispatcher],
  exports: [EventDispatcher, JwtModule],
})
export class CommonModule {}
