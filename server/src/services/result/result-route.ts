import * as result from './result-controller'
import { Router } from 'express'
import { Route } from '../../types/route'

const router = Router({
  mergeParams: true,
})

router.post('/table', result.resultPostTable)

router.post('/radius', result.resultPostRadius)

router.get('/download', result.resultGetDownload)

export const resultRoute = {
  path: 'result',
  router: router,
} as Route
