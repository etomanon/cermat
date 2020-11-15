import { ModelBase } from './objection-model-base'

type Sort = {
  field: string
  order: 'ASC' | 'DESC'
}

export interface Paging {
  page: number
  pageSize: number
  sort?: Sort
}

export const objectionPaging = async <T>(
  paging: Paging,
  model: typeof ModelBase,
  graphJoin?: string[] | string
): Promise<{
  results: T[]
  total: number
}> => {
  const { sort, page, pageSize } = paging
  const query = model.query()
  if (graphJoin) {
    query.withGraphJoined(graphJoin)
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
