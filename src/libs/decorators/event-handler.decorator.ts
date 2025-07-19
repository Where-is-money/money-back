// NOTE: 해당 데코레이터는 적용된 메서드가 오직 이벤트 핸들러에 의해서만 동작한다는걸 명시하기 위함.
export function EventHandler() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
  };
}
