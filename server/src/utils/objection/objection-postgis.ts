import { raw } from 'objection'

export const objectionPostgisPoint = (lng: number, lat: number) =>
  raw(`ST_GeomFromGeoJSON('{
  "type": "Point",
  "coordinates": [${lng}, ${lat}],
}')`)
