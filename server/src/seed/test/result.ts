import { EnumSubject, Result } from '../../services/result/result-model'
import { School } from '../../services/school/school-model'
import { SCHOOL } from './school'

export const resultSeed: () => Promise<Partial<Result>[]> = async () => {
  const school = await School.query()
    .select('id')
    .findOne('redizo', SCHOOL[0].redizo)

  const schoolId = school.id

  return [
    {
      year: 2019,
      subject: EnumSubject.MA,
      shareChosen: 25,
      signed: 10,
      excused: 1,
      expelled: 1,
      tested: 8,
      failed: 2,
      success: 6,
      successPercentil: 45,
      schoolId,
    },
    {
      year: 2018,
      subject: EnumSubject.MA,
      shareChosen: 20,
      signed: 9,
      excused: 2,
      expelled: 1,
      tested: 6,
      failed: 3,
      success: 3,
      successPercentil: 36,
      schoolId,
    },
    {
      year: 2017,
      subject: EnumSubject.MA,
      shareChosen: 18,
      signed: 8,
      excused: 1,
      expelled: 0,
      tested: 7,
      failed: 3,
      success: 4,
      successPercentil: 40,
      schoolId,
    },
  ]
}
