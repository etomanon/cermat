import * as result from './result-controller'
import { Router } from 'express'
import { Route } from '../../types/Route'

const router = Router({
  mergeParams: true,
})

router.get(':id', result.resultGetId)

export const resultRoute = {
  path: '/result',
  router: router,
} as Route
