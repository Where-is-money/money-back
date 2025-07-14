import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

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

  setTraceId(traceId: string) {
    if (!this.createdBy) {
      this.createdBy = traceId;
    }
    this.updatedBy = traceId;
  }
}
