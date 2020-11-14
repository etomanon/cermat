import { Model } from 'objection'
import { ModelBase } from '../../utils/objection/objection-model-base'
import { School } from '../school/school-model'

export enum EnumSubject {
  MEAN = 'MEAN',
  MA = 'MA',
  CJ_DT = 'CJ_DT',
  CJ_UZ = 'CJ_UZ',
  AJ_DT = 'AJ_DT',
  AJ_UZ = 'AJ_UZ',
}

export class Result extends ModelBase {
  year!: number
  subject!: EnumSubject
  shareChosen!: number
  signed!: number
  excused!: number
  expelled!: number
  tested!: number
  failed!: number
  success!: number
  successPercentil!: number
  schoolId!: number

  static tableName = 'result'

  static jsonSchema = {
    type: 'object',
    required: ['year', 'subject'],

    properties: {
      year: { type: 'integer' },
      subject: { type: 'string' },
      shareChosen: { type: ['number', 'null'] },
      signed: { type: ['number', 'null'] },
      excused: { type: ['number', 'null'] },
      expelled: { type: ['number', 'null'] },
      tested: { type: ['number', 'null'] },
      failed: { type: ['number', 'null'] },
      success: { type: ['number', 'null'] },
      successPercentil: { type: ['number', 'null'] },
      schoolId: { type: ['integer', 'null'] },
    },
  }

  static relationMappings = () => ({
    school: {
      relation: Model.BelongsToOneRelation,
      modelClass: School,
      join: {
        from: 'result.schoolId',
        to: 'school.id',
      },
    },
  })
}
