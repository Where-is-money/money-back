import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventBox, EventBoxStatus } from '@libs/ddd';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueueName } from './queue';

@Injectable()
export class EventDispatcher {
  constructor(
    @InjectRepository(EventBox)
    private readonly eventBoxRepository: Repository<EventBox>,
    @InjectQueue(QueueName.ROLE_SERVICE_QUEUE) private readonly roleServiceQueue: Queue
  ) {}

  @OnEvent('event.box.created')
  async handleEventBoxCreated(eventBox: EventBox) {
    // NOTE: 중복 이벤트 방지를 위해 이벤트 박스 목록을 조회하여 중복 이벤트를 제거합니다.
    const [event] = await this.eventBoxRepository.find({
      where: {
        id: eventBox.id,
        status: EventBoxStatus.PENDING,
      },
    });

    if (!event) {
      throw new InternalServerErrorException(`There is no event box.`);
    }

    if (event.type === 'UserCreatedEvent') {
      await this.roleServiceQueue.add(event.type, JSON.parse(event.payload));

      // FIXME: 한곳에서 깔쌈하게 처리하자
      await this.eventBoxRepository.update(event.id, { status: EventBoxStatus.COMPLETED });
    }
  }
}
