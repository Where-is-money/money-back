import { BadRequestException } from '@nestjs/common';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DddEntity } from '@libs/ddd';
import { UserCreatedEvent } from './events';
import { CustomNanoId } from '@libs/helpers';
import { createHash } from 'crypto';
import { RoleType } from '../../roles/domain/roles.entity';
import { UserCreateDto } from '../presentation/dto';

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

  @Column({ unique: true })
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

  static of({ name, email, password }: UserCreateDto) {
    const [_, domain] = email.split('@');

    // FIXME: 추후에 도메인 구입하면 그걸로 체크해아한듯.
    const roleType = domain === 'admin.com' ? RoleType.ADMIN : RoleType.GENERAL;
    return new User({ name, email, password, roleType });
  }

  private hashPassword(password: string) {
    return createHash('sha256').update(password).digest('hex');
  }

  comparePassword(password: string, hashedPassword: string) {
    if (this.hashPassword(password) !== hashedPassword) {
      throw new BadRequestException(`${this.email}'s password is incorrect.`, {
        cause: `email or password is incorrect.`,
      });
    }
  }
}
