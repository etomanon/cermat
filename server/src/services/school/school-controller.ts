import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { School } from './school-entity'

export const schoolGetName = async (
  req: Request,
  res: Response
): Promise<Response<School[]> | null> => {
  const name = req.body.name
  if (!name) {
    return null
  }
  const results = await getRepository(School)
    .createQueryBuilder('school')
    .where('school.name ILIKE :name', { name: `%${name}%` })
    .take(8)
    .getMany()

  return res.send(results)
}
