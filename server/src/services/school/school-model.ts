import { Model } from 'objection'
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

  // This object defines the relations to other models. The relationMappings
  // property can be a thunk to prevent circular dependencies.
  static relationMappings = () => ({
    results: {
      relation: Model.HasManyRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: Result,
      join: {
        from: 'school.id',
        to: 'result.schoolId',
      },
    },
  })
}
