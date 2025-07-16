import { Module } from '@nestjs/common';
import { EventDispatcher } from './event-dispatcher';
import { EventBox } from '@libs/ddd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import queue from './event-dispatcher/queue';

@Module({
  imports: [TypeOrmModule.forFeature([EventBox]), BullModule.registerQueue(...queue)],
  providers: [EventDispatcher],
  exports: [EventDispatcher],
})
export class CommonModule {}
