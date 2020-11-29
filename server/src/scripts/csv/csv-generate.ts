import { Model } from 'objection'
import { Parser } from 'json2csv'
import { knexClient } from '../../../knexfile'
import { join } from 'path'
import fs from 'fs-extra'
import { Result } from '../../services/result/result-model'
import { first } from 'lodash'
import { CSV_FILE_NAME } from './constants'

const DOWNLOAD_PATH = join(__dirname, '..', '..', 'download')
const FILE_PATH = join(DOWNLOAD_PATH, CSV_FILE_NAME)
const DOWNLOAD_PATH_PROD = join(
  __dirname,
  '..',
  '..',
  '..',
  'build',
  'src',
  'download'
)

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
  await fs.writeFile(join(FILE_PATH), csv)
  await fs.copy(DOWNLOAD_PATH, DOWNLOAD_PATH_PROD)
  console.log('CSV generated')
}

csvGenerate()
