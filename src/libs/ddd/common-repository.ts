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
    await this.saveEntities(entities);
    await this.saveEvents(entities.flatMap((entity) => entity.getPublishedEvents()));
  }

  private async saveEntities(entities: T[]) {
    entities.forEach((entity) => entity.setTraceId(this.getTraceId()));
    await this.entityManager.save(entities);
  }

  private async saveEvents(events: EventBox[]) {
    const eventBoxes = events.map((event) => EventBox.fromEvent(event));
    eventBoxes.forEach((event) => event.setTraceId(this.getTraceId()));
    await this.entityManager.save(eventBoxes);

    this.context.set(ContextKey.EVENT_BOXES, eventBoxes);
  }

  private getTraceId() {
    return this.context.get<ContextKey.TRACE_ID, string>(ContextKey.TRACE_ID);
  }
}
