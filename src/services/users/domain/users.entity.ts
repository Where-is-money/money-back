import { BadRequestException } from '@nestjs/common';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddEntity } from '@libs/ddd';
import { UserCreatedEvent } from './events';
import { CustomNanoId } from '@libs/helpers';
import { createHash } from 'crypto';
import { RoleType } from '../../roles/domain/roles.entity';

type Creator = {
  name: string;
  email: string;
  password: string;
  roleType: RoleType;
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

  @Column({ type: 'enum', enum: RoleType })
  roleType!: RoleType;

  constructor(args: Creator) {
    super();

    if (args) {
      this.id = CustomNanoId();
      this.name = args.name;
      this.email = args.email;
      this.password = this.hashPassword(args.password);
      this.roleType = args.roleType;

      this.publishEvent(new UserCreatedEvent(this.id, this.roleType));
    }
  }

  private hashPassword(password: string) {
    return createHash('sha256').update(password).digest('hex');
  }

  comparePassword(password: string, hashedPassword: string) {
    if (this.hashPassword(password) !== hashedPassword) {
      throw new BadRequestException(`email or password is incorrect.`, {
        cause: `${this.email}'s password is incorrect.`,
      });
    }
  }
}
