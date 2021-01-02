import { Point } from 'geojson'
import { raw } from 'objection'

export const objectionPostgisPoint = (lng: number, lat: number) =>
  raw(`ST_GeomFromGeoJSON('{
  "type": "Point",
  "coordinates": [${lng}, ${lat}],
  "crs":{"type":"name","properties":{"name":"EPSG:4326"}}
}')`)

export const objectionPostgisPointStringify = (geom: Point) =>
  JSON.stringify({
    ...geom,
    crs: { type: 'name', properties: { name: 'EPSG:4326' } },
  })
