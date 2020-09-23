import { getRepository, getConnection } from 'typeorm'
import { School } from '../services/school/school-entity'
import { Result } from '../services/result/result-entity'
import { typeormConnection } from '../utils/typeorm-connection'
import { SCHOOL } from './school'
import { resultSeed } from './result'

const createData = async <T>(Entity: any, seed: T[]) => {
  const repo = await getRepository(Entity)
  for (const s of seed) {
    const created = await repo.create(s)
    await repo.save(created)
  }
}

typeormConnection().then(async () => {
  // remove data
  await getConnection().synchronize(true)

  await createData(School, SCHOOL)

  const results = await resultSeed()
  await createData(Result, results)

  console.log('Database seeded')
  process.exit()
})
