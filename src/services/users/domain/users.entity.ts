import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '@libs/ddd';
import { UserCreatedEvent } from './events';

type Creator = {
  name: string;
  email: string;
};

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @AfterInsert()
  private serialize() {
    this.publishEvent(new UserCreatedEvent(this.id));
  }

  constructor(args: Creator) {
    super();

    if (args) {
      this.name = args.name;
      this.email = args.email;
    }
  }
}
