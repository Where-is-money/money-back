import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DddEntity } from '@libs/ddd';

export enum RoleType {
  ADMIN = 'ADMIN',
  GENERAL = 'GENERAL',
}

type Creator = {
  userId: string;
  type: RoleType;
};

@Entity()
export class Role extends DddEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column({ type: 'enum', enum: RoleType })
  type!: RoleType;

  constructor(args: Creator) {
    super();

    if (args) {
      this.userId = args.userId;
      this.type = args.type;
    }
  }
}
