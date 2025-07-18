import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { asyncLocalStorage, ContextKey } from '../context';

export abstract class DddConsumer extends WorkerHost {
  protected readonly logger: Logger;

  protected readonly handlerMap = new Map<string, (data: any) => Promise<void>>();

  async process(job: Job): Promise<void> {
    const handler = this.handlerMap.get(job.name);

    if (!handler) {
      this.logger.error(`There is no handler for ${job.name}.`);
      return;
    }

    const store = this.getContext(job.data.traceId);
    await asyncLocalStorage.run(store, async () => {
      await handler(JSON.parse(job.data.payload));
    });
  }

  private getContext(traceId: string) {
    const store = new Map();
    store.set(ContextKey.TRACE_ID, traceId);
    return store;
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.log(err);
  }
}
