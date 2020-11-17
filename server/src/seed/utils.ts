import { Model } from 'objection'
import { knexClient } from '../../knexfile'
import { OBJECTION_TABLES } from '../utils/objection/objection-constants'

export const prepare = async () => {
  console.log('Seeding started')
  Model.knex(knexClient)
  // remove data
  for (const table of OBJECTION_TABLES) {
    await knexClient(table.tableName).truncate()
  }
}

export const REGIONS = {
  A: 'Praha',
  C: 'Jihočeský',
  B: 'Jihomoravský',
  K: 'Karlovarský',
  J: 'Vysočina',
  H: 'Královéhradecký',
  L: 'Liberecký',
  T: 'Moravskoslezský',
  M: 'Olomoucký',
  E: 'Pardubický',
  P: 'Plzeňský',
  S: 'Středočeský',
  U: 'Ústecký',
  Z: 'Zlínský',
}
