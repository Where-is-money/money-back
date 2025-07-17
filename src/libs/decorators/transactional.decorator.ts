import { CommonService, EventBox } from '../ddd';
import { ContextKey } from '../context';

export function Transactional() {
  return function (target: CommonService, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: CommonService, ...args: any[]) {
      let result: any;

      // @ts-expect-error private property여서 타입 에러가 발생.
      const entityManager = this.entityManager;
      // @ts-expect-error private property여서 타입 에러가 발생.
      const eventEmitter = this.eventEmitter;

      // NOTE: 트랜잭션 처리
      await entityManager.transaction(async (transactionalEntityManager) => {
        this.context.set(ContextKey.ENTITY_MANAGER, transactionalEntityManager);
        result = await originalMethod.apply(this, args);
        this.context.set(ContextKey.ENTITY_MANAGER, null);
      });

      // NOTE: 트랜잭션 완료 후 이벤트 박스를 발행합니다.
      const eventBoxes = this.context.get<ContextKey.EVENT_BOXES, EventBox[]>(
        ContextKey.EVENT_BOXES
      );

      if (eventBoxes) {
        eventBoxes.forEach((event) => eventEmitter.emit('event.box.created', event));
        this.context.set(ContextKey.EVENT_BOXES, null);
      }

      return result;
    };

    return descriptor;
  };
}
