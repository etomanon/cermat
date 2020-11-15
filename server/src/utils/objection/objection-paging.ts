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
}

export const objectionPaging = async <T>(
  paging: Paging,
  model: typeof ModelBase,
  graphJoin?: string[] | string
): Promise<{
  results: T[]
  total: number
}> => {
  const { sort, page, pageSize, filter } = paging
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
  if (sort) {
    query.whereNotNull(sort.field).orderBy(sort.field, sort.order)
  }

  const { results, total } = await query.page(page, pageSize)

  return {
    results: results as any,
    total,
  }
}
