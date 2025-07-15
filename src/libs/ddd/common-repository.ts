import { InjectDataSource } from '@nestjs/typeorm';
import { CommonEntity } from './common-entity';
import { DataSource, EntityManager, ObjectType } from 'typeorm';
import { Context, ContextKey } from '@libs/context';
import { EventBox } from './event-box';

export abstract class CommonRepository<T extends CommonEntity> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly context: Context
  ) {}

  abstract entity: ObjectType<T>;

  get entityManager(): EntityManager {
    return this.context.get(ContextKey.ENTITY_MANAGER) || this.dataSource.manager;
  }

  async save(entities: T[]) {
    const txId = this.context.get<ContextKey.TRACE_ID, string>(ContextKey.TRACE_ID);
    entities.forEach((entity) => entity.setTraceId(txId));

    await this.entityManager.save(entities);
    await this.saveEvents(entities.flatMap((entity) => entity.getPublishedEvents()));
  }

  async saveEvents(events: EventBox[]) {
    if (!events || events.length === 0) return;
    const eventBoxes = events.map((event) => EventBox.fromEvent(event));
    await this.entityManager.save(eventBoxes);
  }
}
