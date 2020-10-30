import { School } from '../school/school-entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm'
import { ColumnNumericTransformer } from '../../utils/typeorm/typeorm-transformers'

export enum EnumSubject {
  MEAN = 'MEAN',
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

  @Column({ type: 'enum', enum: EnumSubject })
  subject: EnumSubject

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  shareChosen: number

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  signed: number

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  excused: number

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  expelled: number

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  tested: number

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  failed: number

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  success: number

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 4,
    scale: 1,
    transformer: new ColumnNumericTransformer(),
  })
  successPercentil: number

  @ManyToOne(() => School, (school) => school.results)
  school: School

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
