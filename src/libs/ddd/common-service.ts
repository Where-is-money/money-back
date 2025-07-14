import { Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Context } from '@libs/context';

export abstract class CommonService {
  @InjectEntityManager()
  private readonly entityManager!: EntityManager;

  @Inject()
  readonly context!: Context;
}
