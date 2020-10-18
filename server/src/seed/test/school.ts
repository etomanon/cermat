import { School } from '../../services/school/school-entity'

export const SCHOOL: Partial<School>[] = [
  {
    name: 'Střední škola Praha',
    redizo: '123',
    region: 'P',
    geom: {
      type: 'Point',
      coordinates: [14.4360319, 50.0901679],
    },
  },
]
