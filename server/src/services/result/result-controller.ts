import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Result } from './result-entity'

export const resultGetId = async (
  req: Request,
  res: Response
): Promise<Response<Result>> => {
  const results = await getRepository(Result).findOne({
    id: parseInt(req.params.id),
  })
  return res.send(results)
}

/**
 * Get data for table view in client
 * @param req
 * @param res
 */
export const resultPostTable = async (
  req: Request,
  res: Response
): Promise<Response<Result[]>> => {
  const results = await getRepository(Result).find({
    relations: ['school'],
    take: 20,
  })
  return res.send(results)
}
