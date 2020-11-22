import { Request, Response } from 'express'
import { objectionPaging, Paging } from '../../utils/objection/objection-paging'
import { EnumSubject, Result } from './result-model'

/**
 * Get data for table view in client
 * @param req
 * @param res
 */
export const resultPostTable = async (
  req: Request<any, any, Paging>,
  res: Response
): Promise<Response<Result[]>> => {
  const { page, pageSize, sort, filter, geom } = req.body

  const { results, total } = await objectionPaging<Result>(
    { page, pageSize, sort, filter, geom },
    Result,
    'school'
  )

  return res.send({
    results,
    total,
  })
}

type PostRadius = {
  geom: GeoJSON.Point | null
  radius: number
  subject: EnumSubject
  year: number
}

/**
 * Get the best 50 results for 1 school, subject & year in specified radius
 * @param req
 * @param res
 */
export const resultPostRadius = async (
  req: Request<any, any, PostRadius>,
  res: Response
): Promise<Response<Result[]>> => {
  const { geom, subject, year, radius } = req.body

  const results = await Result.query()
    .withGraphJoined(`school(selectDefault)`)
    .whereNotNull(`school.geom`)
    .where('result.year', year)
    .where('result.subject', subject)
    .whereRaw(
      `ST_Distance(school.geom_raw::geography, ST_GeomFromGeoJSON(:geom)::geography) < :radius`,
      {
        geom: JSON.stringify(geom),
        radius,
      }
    )
    .orderBy('result.successPercentil', 'DESC')
    .limit(50)

  return res.send({
    results,
  })
}
