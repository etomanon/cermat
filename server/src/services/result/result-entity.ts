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
  MA = 'MA',
  CJ_DT = 'CJ_DT',
  CJ_UZ = 'CJ_UZ',
  AJ_DT = 'AJ_DT',
  AJ_UZ = 'AJ_UZ',
}

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  year: number

  @Column({ type: 'enum', enum: Subject })
  subject: Subject

  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
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

  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  successPercentil: number

  @ManyToOne(() => School, (school) => school.results)
  school: School

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
