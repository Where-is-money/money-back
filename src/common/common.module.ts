import { Module } from '@nestjs/common';
import { EventDispatcher } from './event-dispatcher';
import { EventBox } from '@libs/ddd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import queue from './event-dispatcher/queue';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventBox]),
    BullModule.registerQueue(...queue),
    EventEmitterModule.forRoot(),
  ],
  providers: [EventDispatcher],
  exports: [EventDispatcher],
})
export class CommonModule {}
