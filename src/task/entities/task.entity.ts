// task.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Status, Priority } from '../enums/task.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dueDate: string;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Priority,
  })
  priority: Priority;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfCreation: Date;

  @Column({ default: true })
  isActive: boolean;
}
