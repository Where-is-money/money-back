import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { EventBox } from './event-box';

@Entity()
export abstract class CommonEntity {
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Column()
  private createdBy!: string;

  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @Column()
  private updatedBy!: string;

  private events: EventBox[] = [];

  setTraceId(traceId: string) {
    if (!this.createdBy) {
      this.createdBy = traceId;
    }
    this.updatedBy = traceId;
  }

  publishEvent(event: EventBox) {
    this.events.push(event);
  }

  getPublishedEvents() {
    return this.events;
  }
}
