import { EventBox } from '@libs/ddd';

export class UserCreatedEvent extends EventBox {
  public userId!: number;

  constructor(userId: number) {
    super();
    this.userId = userId;
  }
}
