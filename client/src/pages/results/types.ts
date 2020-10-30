import { School } from '@/store/modules/school/school-types'

export interface Result {
  id: number
  year: number
  subject: string
  shareChosen?: null
  signed: number
  excused: number
  expelled: number
  tested: number
  failed: number
  success: number
  successPercentil: number
  createdAt: string
  updatedAt: string
  school: School
}
