import { Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Context } from '@libs/context';
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class CommonService {
  @InjectEntityManager()
  private readonly entityManager!: EntityManager;

  @Inject()
  private readonly eventEmitter!: EventEmitter2;

  @Inject()
  readonly context!: Context;
}
