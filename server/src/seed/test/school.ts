import { School } from '../../services/school/school-model'
import { objectionPostgisPoint } from '../../utils/objection/objection-postgis'

export const SCHOOL: Partial<School>[] = [
  {
    name: 'Střední škola Praha',
    redizo: '123',
    region: 'P',
    geom: objectionPostgisPoint(14.4360319, 50.0901679),
  },
]
