export interface School {
  id: number
  name: string
  redizo: string
  region: string
  geom: Geom
  createdAt: string
  updatedAt: string
}
export interface SchoolResults {
  id: number
  name: string
  redizo: string
  region: string
  geom: Geom
  createdAt: string
  updatedAt: string
  results?: ResultsEntity[] | null
}
export enum EnumSubject {
  MA = 'MA',
  CJ_DT = 'CJ_DT',
  CJ_UZ = 'CJ_UZ',
  AJ_DT = 'AJ_DT',
  AJ_UZ = 'AJ_UZ',
}
export interface ResultsEntity {
  id: number
  year: number
  subject: EnumSubject
  shareChosen: number
  signed: number
  excused: number
  expelled: number
  tested: number
  failed: number
  success: number
  successPercentil: number
  createdAt: string
  updatedAt: string
}

export interface Geom {
  type: string
  coordinates?: number[] | null
}

export type SchoolState = {
  schoolSelected?: School
  schoolSelectedCompare?: School
}
