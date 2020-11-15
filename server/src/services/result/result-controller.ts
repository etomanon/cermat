import { Request, Response } from 'express'
import { objectionPaging, Paging } from '../../utils/objection/objection-paging'
import { Result } from './result-model'

/**
 * Get data for table view in client
 * @param req
 * @param res
 */
export const resultPostTable = async (
  req: Request<any, any, Paging>,
  res: Response
): Promise<Response<Result[]>> => {
  const { page, pageSize, sort } = req.body

  const { results, total } = await objectionPaging<Result>(
    { page, pageSize, sort },
    Result,
    'school'
  )

  return res.send({
    results,
    total,
  })
}
