import { CommonService } from '../ddd';
import { ContextKey } from '../context';

export function Transactional() {
  return function (target: CommonService, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: CommonService, ...args: any[]) {
      let result: any;

      // @ts-expect-error private property여서 타입 에러가 발생.
      const entityManager = this.entityManager;

      await entityManager.transaction(async (transactionalEntityManager) => {
        this.context.set(ContextKey.ENTITY_MANAGER, transactionalEntityManager);
        result = await originalMethod.apply(this, args);
        this.context.set(ContextKey.ENTITY_MANAGER, null);
      });

      return result;
    };

    return descriptor;
  };
}
