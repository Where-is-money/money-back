import { InjectDataSource } from '@nestjs/typeorm';
import { CommonEntity } from './common-entity';
import { DataSource, EntityManager, ObjectType } from 'typeorm';
import { Context, ContextKey } from '@libs/context';

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
    entities.forEach((entity) => {
      entity.setTraceId(this.context.get(ContextKey.TRACE_ID));
    });

    await this.entityManager.save(entities);
  }
}
