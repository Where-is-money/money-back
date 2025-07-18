import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UserCreatedEvent } from '../../users/domain/events';
import { Transactional } from '@libs/decorators';
import { ContextKey } from '../../../libs/context';

@Injectable()
export class AdminRolesService extends DddService {
  @Transactional()
  async hest(event: UserCreatedEvent) {
    const traceId = this.context.get(ContextKey.TRACE_ID);
    console.log(traceId);
    console.log('@@@@@@@@@@@@@@@@');
  }
}
