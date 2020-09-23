import { School } from '../school/school-entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm'

export enum Subject {
  MATH = 'math',
}

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  year: string

  @Column({ type: 'enum', enum: Subject })
  subject: Subject

  @Column()
  shareChosen: number

  @Column()
  signed: number

  @Column()
  excused: number

  @Column()
  expelled: number

  @Column()
  tested: number

  @Column()
  failed: number

  @Column()
  success: number

  @Column()
  successPercentil: number

  @ManyToOne(() => School, (school) => school.results)
  school: School

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
