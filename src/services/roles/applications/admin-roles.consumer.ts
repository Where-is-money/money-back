import { Processor } from '@nestjs/bullmq';
import { QueueName } from '@common/event-dispatcher/queue';
import { AdminRolesService } from './admin-roles.service';
import { DddConsumer } from '@libs/ddd';

@Processor(QueueName.ROLE_SERVICE_QUEUE)
export class AdminRolesConsumer extends DddConsumer {
  constructor(private readonly adminRolesService: AdminRolesService) {
    super();

    this.handlerMap.set(
      'UserCreatedEvent',
      this.adminRolesService.handleUserCreatedEvent.bind(this.adminRolesService)
    );
  }
}
