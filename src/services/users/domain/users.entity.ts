import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddEntity } from '@libs/ddd';
import { UserCreatedEvent } from './events';
import { CustomNanoId } from '@libs/helpers';

type Creator = {
  name: string;
  email: string;
};

@Entity()
export class User extends DddEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  constructor(args: Creator) {
    super();

    if (args) {
      this.id = CustomNanoId();
      this.name = args.name;
      this.email = args.email;

      this.publishEvent(new UserCreatedEvent(this.id));
    }
  }
}
