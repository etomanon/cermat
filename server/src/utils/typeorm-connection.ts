import { config } from 'dotenv'
import { createConnection, Connection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

config()

const {
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING,
} = process.env

export const typeormConnection = (): Promise<Connection> =>
  createConnection({
    type: TYPEORM_CONNECTION,
    host: TYPEORM_HOST,
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    port: parseInt(TYPEORM_PORT),
    synchronize: TYPEORM_SYNCHRONIZE === 'true',
    logging: JSON.parse(TYPEORM_LOGGING),
    entities: ['src/**/*entity{.ts,.js}'],
  } as PostgresConnectionOptions)
