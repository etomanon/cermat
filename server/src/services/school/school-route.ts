import * as school from './school-controller'
import { Router } from 'express'
import { Route } from '../../types/route'

const router = Router({
  mergeParams: true,
})

router.post('/name', school.schoolPostName)

router.post('/results', school.schoolPostResults)

export const schoolRoute = {
  path: 'school',
  router: router,
} as Route
