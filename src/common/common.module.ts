import { Module } from '@nestjs/common';
import { EventDispatcher } from './event-dispatcher';
import { EventBox } from '@libs/ddd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import queue from './event-dispatcher/queue';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventBox]),
    BullModule.registerQueue(...queue),
    EventEmitterModule.forRoot(),
    JwtModule,
  ],
  providers: [EventDispatcher],
  exports: [EventDispatcher, JwtModule],
})
export class CommonModule {}
