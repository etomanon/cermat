import { getRepository, getConnection } from 'typeorm'
import { School } from '../../services/school/school-entity'
import { Result, EnumSubject } from '../../services/result/result-entity'
import { typeormConnection } from '../../utils/typeorm/typeorm-connection'
import { DataProd } from './types'
import { isAllNull } from '../../utils/object/isAllNull'
const data = require('../../../../data/data.json') as DataProd

const createData = async <T>(Entity: any, seed: T[]) => {
  const repo = getRepository(Entity)
  for (const s of seed) {
    const created = await repo.create(s)
    await repo.save(created)
  }
}

typeormConnection().then(async () => {
  await getConnection().synchronize(true) // remove data

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
      subject: EnumSubject[r.subject],
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

  // calculate average for all results per year per school
  const dataSchools = await getRepository(School).find()
  const dataYears = await getRepository(Result)
    .createQueryBuilder('result')
    .select('DISTINCT result.year', 'year')
    .getRawMany<{ year: number }>()

  const years = dataYears.map((y) => y.year)

  const meanColumns = getConnection()
    .getMetadata(Result)
    .ownColumns.filter((c) => c.type === 'decimal')
    .map((c) => c.databasePath)

  const meanSelect = `${meanColumns
    .map(
      (c, i) =>
        `ROUND(AVG(result.${c}), 1) AS "${c}"${
          i + 1 < meanColumns.length ? ', ' : ''
        }`
    )
    .join('')}`

  for (const s of dataSchools) {
    for (const y of years) {
      const dataResults = await getRepository(Result)
        .createQueryBuilder('result')
        .leftJoinAndSelect('result.school', 'school')
        .where('result.year = :year AND school.id = :schoolId', {
          schoolId: s.id,
          year: y,
        })
        .select(meanSelect)
        .getRawOne<Partial<Result>>()
      if (isAllNull(dataResults)) {
        continue
      }
      await createData(Result, [
        {
          ...dataResults,
          subject: EnumSubject.MEAN,
          year: y,
          school: s,
        },
      ])
    }
  }

  console.log('Database seeded with prod data')
  process.exit()
})
