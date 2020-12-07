import { config } from 'dotenv'
import knex, { Config } from 'knex'
import { knexSnakeCaseMappers } from 'objection'
import { types } from 'pg'

config()

const {
  KNEX_HOST,
  KNEX_USERNAME,
  KNEX_PASSWORD,
  KNEX_DATABASE,
  KNEX_PORT,
} = process.env

const database: Config = {
  client: 'pg',
  connection: {
    host: KNEX_HOST,
    user: KNEX_USERNAME,
    password: KNEX_PASSWORD,
    database: KNEX_DATABASE,
    port: parseInt(KNEX_PORT),
  },
  debug: false,
  migrations: {
    directory: './src/migrations',
  },
  pool: {
    propagateCreateError: false
  },
  ...knexSnakeCaseMappers(),
}

/**
 * Parse decimal column type as float instead of string
 */
types.setTypeParser(1700, (val) => {
  return parseFloat(val)
})

export const knexClient = knex(database)

export default database
