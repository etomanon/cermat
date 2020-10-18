interface DataSchool {
  region: string
  redizo: string
  lat: number
  lng: number
  name: string
}

interface DataResult {
  school: string
  year: string
  subject: string
  shareChosen: number
  signed: number
  excused: number
  expelled: number
  tested: number
  failed: number
  success: number
  successPercentil: number
}

export type DataProd = {
  schools: DataSchool[]
  results: DataResult[]
}
