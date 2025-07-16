import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EventBoxStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity()
export class EventBox {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  traceId!: string;

  @Column()
  type!: string;

  @Column({ type: 'mediumtext' })
  payload!: string;

  @Column({ type: 'enum', enum: EventBoxStatus, default: EventBoxStatus.PENDING })
  status!: EventBoxStatus;

  @CreateDateColumn()
  private readonly createdAt!: Date;

  @UpdateDateColumn()
  private readonly updatedAt!: Date;

  constructor() {
    this.type = this.constructor.name;
  }

  static fromEvent(event: EventBox): EventBox {
    const eventBox = new EventBox();
    const { id, type, traceId, ...rest } = event;
    eventBox.type = event.constructor.name;
    eventBox.payload = JSON.stringify(rest);
    return eventBox;
  }

  setTraceId(traceId: string) {
    this.traceId = traceId;
  }
}
