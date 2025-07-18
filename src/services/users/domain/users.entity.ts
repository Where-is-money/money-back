import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddEntity } from '@libs/ddd';
import { UserCreatedEvent } from './events';
import { CustomNanoId } from '@libs/helpers';
import { createHash } from 'crypto';

type Creator = {
  name: string;
  email: string;
  password: string;
  roleType: string;
};

@Entity()
export class User extends DddEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column()
  roleType!: string;

  constructor(args: Creator) {
    super();

    if (args) {
      this.id = CustomNanoId();
      this.name = args.name;
      this.email = args.email;
      this.password = this.hashPassword(args.password);
      this.roleType = args.roleType;

      this.publishEvent(new UserCreatedEvent(this.id));
    }
  }

  private hashPassword(password: string) {
    return createHash('sha256').update(password).digest('hex');
  }

  private comparePassword(password: string, hashedPassword: string) {
    return this.hashPassword(password) === hashedPassword;
  }
}
