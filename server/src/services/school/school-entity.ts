import { Result } from '../result/result-entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'

@Entity()
export class School {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column()
  name: string

  @Index({ unique: true })
  @Column()
  redizo: string

  @Column()
  region: string

  // https://github.com/typeorm/typeorm/issues/2610#issuecomment-473903882
  @Column({ type: 'geography', srid: 4326, spatialFeatureType: 'Point' })
  @Index({ spatial: true })
  geom: GeoJSON.Point

  @OneToMany(() => Result, (result) => result.school)
  results: Result[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
