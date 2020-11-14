import { Model } from 'objection'
import { knexClient } from '../../knexfile'
import { OBJECTION_TABLES } from '../utils/objection/objection-constants'

export const prepare = async () => {
  Model.knex(knexClient)
  // remove data
  for (const table of OBJECTION_TABLES) {
    await knexClient(table.tableName).truncate()
  }
}
