import { DataProd } from './types'
import { EnumSubject, Result } from '../../services/result/result-model'
import { School } from '../../services/school/school-model'
import { raw } from 'objection'
import { prepare, REGIONS } from '../utils'
import { objectionPostgisPoint } from '../../utils/objection/objection-postgis'
import { isAllNil } from '../../utils/object/isAllNull'
const data = require('../../../../data/data.json') as DataProd

;(async () => {
  await prepare()

  const schools: Partial<School>[] = data.schools.map((s) => ({
    name: s.name,
    redizo: s.redizo,
    region: REGIONS[s.region] ?? s.region,
    geom: objectionPostgisPoint(s.lng, s.lat),
  }))

  for (const school of schools) {
    await School.query().insert(school)
  }

  const results: Partial<Result>[] = []
  for (const r of data.results) {
    const school = await School.query().select('id').findOne('redizo', r.school)
    const schoolId = school.id

    const parsed = {
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
      schoolId: schoolId,
    }
    results.push(parsed)
  }

  for (const result of results) {
    await Result.query().insert(result)
  }

  // calculate average for all results per year per school
  const dataSchools = await School.query()
  const dataYears = await Result.query().distinct('year')
  const years = dataYears.map((y) => y.year)
  const meanColumns = [
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
      const json = resultMean.$toJson()
      const jsonSelected = meanColumns.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: json[cur],
        }),
        {}
      )

      if (resultMean && !isAllNil(jsonSelected)) {
        await Result.query().insert({
          ...resultMean,
          subject: EnumSubject.MEAN,
          year: year,
          schoolId: school.id,
        })
      }
    }
  }

  await School.query().where('name', 'unknown').delete()

  console.log('Database seeded with prod data')
  process.exit()
})()
