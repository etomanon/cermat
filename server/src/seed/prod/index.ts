import { DataProd } from './types'
import { EnumSubject, Result } from '../../services/result/result-model'
import { School } from '../../services/school/school-model'
import { raw } from 'objection'
import { prepare } from '../utils'
import { objectionPostgisPoint } from '../../utils/objection/objection-postgis'
const data = require('../../../../data/data.json') as DataProd

;(async () => {
  prepare()

  const schools: Partial<School>[] = data.schools.map((s) => ({
    name: s.name,
    redizo: s.redizo,
    region: s.region,
    geom: objectionPostgisPoint(s.lng, s.lat),
  }))

  await School.query().insert(schools)
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
      schoolId: (await School.query().select('id').findOne('redizo', r.school))
        .id,
    }))
  )

  for (const result of results) {
    await Result.query().insert(result)
  }

  // calculate average for all results per year per school
  const dataSchools = await School.query()
  const dataYears = await Result.query().distinct('year')
  const years = dataYears.map((y) => y.year)
  const meanColumns = [
    'share_chosen',
    'signed',
    'excused',
    'expelled',
    'tested',
    'failed',
    'success',
    'success_percentil',
  ]

  const meanSelect = `${meanColumns
    .map(
      (c, i) =>
        `ROUND(AVG(${c}), 1) AS "${c}"${i + 1 < meanColumns.length ? ', ' : ''}`
    )
    .join('')}`

  for (const school of dataSchools) {
    for (const year of years) {
      const resultMean = await school
        .$relatedQuery('results')
        .where({
          year,
        })
        .select(raw(meanSelect))
        .first()

      if (resultMean) {
        await Result.query().insert({
          ...resultMean,
          subject: EnumSubject.MEAN,
          year: year,
          schoolId: school.id,
        })
      }
    }
  }

  console.log('Database seeded with prod data')
  process.exit()
})()
