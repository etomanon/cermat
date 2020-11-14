import { SCHOOL } from './school'
import { resultSeed } from './result'
import { School } from '../../services/school/school-model'
import { Result } from '../../services/result/result-model'
import { prepare } from '../utils'
;(async () => {
  prepare()

  await School.query().insert(SCHOOL)

  const results = await resultSeed()
  await Result.query().insert(results)

  console.log('Database seeded with test data')
  process.exit()
})()
