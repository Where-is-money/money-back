import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export enum ContextKey {
  TXID = 'txId',
}

export const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class Context {
  get<T extends ContextKey, K>(key: T): K | undefined {
    return asyncLocalStorage.getStore()?.get(key);
  }

  set<T extends ContextKey, K>(key: T, value: K) {
    asyncLocalStorage.getStore()?.set(key, value);
  }
}
