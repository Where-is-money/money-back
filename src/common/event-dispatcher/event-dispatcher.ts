import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventBox, EventBoxStatus } from '@libs/ddd';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueueName } from './queue';

// FIXME: 여기 좀 더 리팩토링 필요
@Injectable()
export class EventDispatcher {
  private readonly eventMap = new Map<string, string[]>([
    ['UserCreatedEvent', [QueueName.ROLE_SERVICE_QUEUE]],
  ]);

  private readonly queues = {
    [QueueName.ROLE_SERVICE_QUEUE]: this.roleServiceQueue,
    [QueueName.USER_SERVICE_QUEUE]: this.userServiceQueue,
  };

  constructor(
    @InjectRepository(EventBox)
    private readonly eventBoxRepository: Repository<EventBox>,
    @InjectQueue(QueueName.ROLE_SERVICE_QUEUE) private readonly roleServiceQueue: Queue,
    @InjectQueue(QueueName.USER_SERVICE_QUEUE) private readonly userServiceQueue: Queue
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

    const targetQueues = this.getQueue(event.eventType);

    if (!targetQueues) {
      throw new InternalServerErrorException(`There is no queue for ${event.eventType}.`);
    }

    // NOTE: 이벤트 타입에 따라 이벤트 큐에 넣습니다.
    await Promise.all(
      targetQueues.map((queueName) => this.queues[queueName].add(event.eventType, event))
    );

    // NOTE: Redis 이벤트 큐에 넣은 이벤트는 모두 처리되었으므로 이벤트 박스를 완료 처리합니다.
    await this.eventBoxRepository.update(event.id, { status: EventBoxStatus.COMPLETED });
  }

  private getQueue(eventType: string) {
    return this.eventMap.get(eventType);
  }
}
