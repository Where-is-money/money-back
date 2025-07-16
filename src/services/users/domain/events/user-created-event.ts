import { EventBox } from '@libs/ddd';

export class UserCreatedEvent extends EventBox {
  public userId!: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}
