import { getRepository } from 'typeorm'
import { Result, Subject } from '../../services/result/result-entity'
import { School } from '../../services/school/school-entity'
import { SCHOOL } from './school'

export const resultSeed: () => Promise<Partial<Result>[]> = async () => [
  {
    year: 2019,
    subject: Subject.MA,
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
  {
    year: 2018,
    subject: Subject.MA,
    shareChosen: 20,
    signed: 9,
    excused: 2,
    expelled: 1,
    tested: 6,
    failed: 3,
    success: 3,
    successPercentil: 36,
    school: await getRepository(School).findOne({ redizo: SCHOOL[0].redizo }),
  },
  {
    year: 2017,
    subject: Subject.MA,
    shareChosen: 18,
    signed: 8,
    excused: 1,
    expelled: 0,
    tested: 7,
    failed: 3,
    success: 4,
    successPercentil: 40,
    school: await getRepository(School).findOne({ redizo: SCHOOL[0].redizo }),
  },
]
