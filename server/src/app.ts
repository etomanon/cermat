import { join } from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import noCache from 'nocache'

import ROUTES from './router'
import { typeormConnection } from './utils/typeorm/typeorm-connection'

typeormConnection().then(async () => {
  // create and setup express app
  const app = express()
  // gzip
  app.use(compression())
  // body parser
  app.use(bodyParser.json())
  // proper headers
  app.use(helmet())
  // no cache
  app.use(noCache())
  // register routes
  ROUTES.forEach((r) => app.use(`/api/${r.path}`, r.router))
  // serve react build in production mode
  app.use(express.static(join(__dirname, '/../../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '/../../client/build/index.html'))
  })

  // start express server
  app.listen(3001)
})
