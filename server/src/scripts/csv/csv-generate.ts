import { Model } from 'objection'
import { Parser } from 'json2csv'
import { knexClient } from '../../../knexfile'
import { join } from 'path'
import { promises as fs } from 'fs'
import { Result } from '../../services/result/result-model'
import { first } from 'lodash'

export const CSV_FILE_NAME = 'maturoid.csv'

/**Generate csv from results & school data */
const csvGenerate = async () => {
  console.log('Generating CSV from database')
  Model.knex(knexClient)

  const results = await Result.query()
    .select('')
    .joinRelated(`school(selectDefault)`)
    .orderBy('school.id', 'ASC')

  const fields = Object.keys(first(results))

  const parser = new Parser({
    fields,
  })
  const csv = parser.parse(results)
  await fs.writeFile(join(__dirname, CSV_FILE_NAME), csv)
  console.log('CSV generated')
}

csvGenerate()
