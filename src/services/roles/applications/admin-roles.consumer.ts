import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { UserCreatedEvent } from '../../users/domain/events';

@Processor('role-service-queue')
export class AdminRolesConsumer extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case 'UserCreatedEvent':
        await this.handleUserCreatedEvent(job.data);
        break;
    }
  }

  async handleUserCreatedEvent(event: UserCreatedEvent) {}
}
