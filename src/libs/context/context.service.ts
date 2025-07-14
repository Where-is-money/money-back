import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export enum ContextKey {
  TRACE_ID = 'traceId',
  ENTITY_MANAGER = 'entityManager',
}

export const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class Context {
  get<T extends ContextKey, K>(key: T): K {
    const store = asyncLocalStorage.getStore();

    if (!store) {
      throw new Error(`Context not found(${key})`);
    }

    return store.get(key);
  }

  set<T extends ContextKey, K>(key: T, value: K) {
    asyncLocalStorage.getStore()?.set(key, value);
  }
}
