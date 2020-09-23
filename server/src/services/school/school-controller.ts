import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { School } from './school-entity'

export const schoolGetName = async (
  req: Request,
  res: Response
): Promise<Response<School>> => {
  const results = await getRepository(School).findOne({
    name: req.params.name,
  })
  return res.send(results)
}
