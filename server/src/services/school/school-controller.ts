import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { School } from './school-entity'

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
  const results = await getRepository(School)
    .createQueryBuilder('school')
    .where(`(school.name ILIKE :name OR school.redizo = :redizo)`, {
      name: `%${name}%`,
      redizo: name,
    })
    .take(8)
    .getMany()

  return res.send(results)
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
  const result = await getRepository(School)
    .createQueryBuilder('school')
    .where(`school.redizo = :redizo`, { redizo })
    .innerJoinAndSelect('school.results', 'results')
    .getOne()

  return res.send(result)
}
