export interface School {
  id: number
  name: string
  redizo: string
  region: string
  geom: Geom
  createdAt: string
  updatedAt: string
}
export interface Geom {
  type: string
  coordinates?: number[] | null
}

export type SchoolState = {
  schoolSelected?: School
}
