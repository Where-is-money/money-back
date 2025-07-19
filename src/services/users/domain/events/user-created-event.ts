import { EventBox } from '@libs/ddd';
import { RoleType } from '../../../roles/domain/roles.entity';

export class UserCreatedEvent extends EventBox {
  public userId!: string;

  public roleType!: RoleType;

  constructor(userId: string, roleType: RoleType) {
    super();
    this.userId = userId;
    this.roleType = roleType;
  }
}
