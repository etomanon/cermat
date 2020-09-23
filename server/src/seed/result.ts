import { getRepository } from 'typeorm'
import { Result, Subject } from '../services/result/result-entity'
import { School } from '../services/school/school-entity'
import { SCHOOL } from './school'

export const resultSeed: () => Promise<Partial<Result>[]> = async () => [
  {
    year: '2019',
    subject: Subject.MATH,
    shareChosen: 25,
    signed: 10,
    excused: 1,
    expelled: 1,
    tested: 8,
    failed: 2,
    success: 6,
    successPercentil: 45,
    school: await getRepository(School).findOne({ redizo: SCHOOL[0].redizo }),
  },
]
