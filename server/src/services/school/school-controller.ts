import { Request, Response } from 'express'
import { School } from './school-model'

/**
 * Get schools based on name or redizo (light full text search)
 * @param req
 * @param res
 */
export const schoolPostName = async (
  req: Request,
  res: Response
): Promise<Response<School[]> | null> => {
  const name = req.body.name
  if (!name) {
    return null
  }

  const results = await School.query()
    .whereRaw(`(school.name ILIKE :name OR school.redizo = :redizo)`, {
      name: `%${name}%`,
      redizo: name,
    })
    .page(0, 8)

  return res.send(results.results)
}

/**
 * Get all results for 1 school by redizo
 * @param req
 * @param res
 */
export const schoolPostResults = async (
  req: Request,
  res: Response
): Promise<Response<School[]> | null> => {
  const redizo = req.body.redizo
  if (!redizo) {
    return null
  }

  const result = await School.query()
    .where('redizo', redizo)
    .withGraphFetched('results')
    .first()

  return res.send(result)
}
