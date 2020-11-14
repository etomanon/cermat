import { Request, Response } from 'express'
import { knexClient } from '../../../knexfile'
import { OBJECTION_TABLES } from '../../utils/objection/objection-constants'
import { objectionPaging, Paging } from '../../utils/objection/objection-paging'
import { stringExpand } from '../../utils/string/string-expand'
import { Result } from './result-model'

/**
 * Get data for table view in client
 * @param req
 * @param res
 */
export const resultPostTable = async (
  req: Request,
  res: Response
): Promise<Response<Result[]>> => {
  const { page, pageSize, sort } = req.body as Paging
  if (sort && sort.field.includes('.')) {
    const sorting = sort.field.split('.')
    const table = sorting[0]
    const field = sorting[1]
    const model = OBJECTION_TABLES.find((t) => t.tableName === table)
    const { results, total } = await objectionPaging<typeof model>(
      {
        page,
        pageSize,
        sort: {
          field,
          order: sort.order,
        },
      },
      model
    )

    // TODO: get results and match them
  } else {
    const { results, total } = await objectionPaging<Result>(
      { page, pageSize, sort },
      Result
    )

    const data = await Result.fetchGraph(results, 'school')

    return res.send({
      results: data,
      total,
    })
  }
}
