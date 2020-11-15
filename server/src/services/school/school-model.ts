import { QueryBuilder } from 'knex'
import { Model, raw } from 'objection'
import { ModelBase } from '../../utils/objection/objection-model-base'
import { Result } from '../result/result-model'

export class School extends ModelBase {
  name!: string
  redizo!: string
  region!: string
  geom!: any
  results?: Result[]

  static tableName = 'school'

  static jsonSchema = {
    type: 'object',
    required: ['name', 'redizo', 'region'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      redizo: { type: 'string' },
    },
  }

  static relationMappings = () => ({
    results: {
      relation: Model.HasManyRelation,
      modelClass: Result,
      join: {
        from: 'school.id',
        to: 'result.schoolId',
      },
    },
  })

  static modifiers = {
    selectDefault(query: QueryBuilder<School>) {
      query.select(
        raw(
          'redizo, name, region, created_at, updated_at, ST_AsGeoJSON("geom")::json AS "geom"'
        )
      )
    },
  } as any
}
