import { getRepository, getConnection } from 'typeorm'
import { School } from '../../services/school/school-entity'
import { Result, Subject } from '../../services/result/result-entity'
import { typeormConnection } from '../../utils/typeorm/typeorm-connection'
import { DataProd } from './types'
const data = require('../../../../data/data.json') as DataProd

const createData = async <T>(Entity: any, seed: T[]) => {
  const repo = getRepository(Entity)
  for (const s of seed) {
    const created = await repo.create(s)
    await repo.save(created)
  }
}

typeormConnection().then(async () => {
  // remove data
  await getConnection().synchronize(true)

  const schools: Partial<School>[] = data.schools.map((s) => ({
    name: s.name,
    redizo: s.redizo,
    region: s.region,
    geom: {
      type: 'Point',
      coordinates: [s.lng, s.lat],
    },
  }))

  await createData(School, schools)

  const results: Partial<Result>[] = await Promise.all(
    data.results.map(async (r) => ({
      year: parseInt(r.year),
      subject: Subject[r.subject],
      shareChosen: r.shareChosen,
      signed: r.signed,
      excused: r.excused,
      expelled: r.expelled,
      tested: r.tested,
      failed: r.failed,
      success: r.success,
      successPercentil: r.successPercentil,
      school: await getRepository(School).findOne({ redizo: r.school }),
    }))
  )

  await createData(Result, results)

  console.log('Database seeded with prod data')
  process.exit()
})
