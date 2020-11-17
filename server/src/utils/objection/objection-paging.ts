import { isNil } from 'lodash'
import { ModelBase } from './objection-model-base'

type Sort = {
  field: string
  order: 'ASC' | 'DESC'
}

type Filter = Record<string, (string | number)[]>

export interface Paging {
  page: number
  pageSize: number
  sort?: Sort
  filter?: Filter
  geom?: GeoJSON.Point | null
}

export const objectionPaging = async <T>(
  paging: Paging,
  model: typeof ModelBase,
  graphJoin?: string[] | string
): Promise<{
  results: T[]
  total: number
}> => {
  const { sort, page, pageSize, filter, geom } = paging
  const query = model.query()
  if (graphJoin) {
    query.withGraphJoined(`${graphJoin}(selectDefault)`)
  }
  if (filter) {
    const fields = Object.keys(filter)
    for (const field of fields) {
      if (filter[field].length > 0) {
        query.whereIn(field, filter[field])
      }
    }
  }
  if (sort && isNil(geom)) {
    query.whereNotNull(sort.field).orderBy(sort.field, sort.order)
  }
  if (geom) {
    query
      .whereNotNull(`${graphJoin}.geom`)
      .orderByRaw(
        `ST_Distance(${graphJoin}.geom_raw, ST_GeomFromGeoJSON('${JSON.stringify(
          geom
        )}')) ASC`
      )
  }

  const { results, total } = await query.page(page, pageSize)

  return {
    results: results as any,
    total,
  }
}