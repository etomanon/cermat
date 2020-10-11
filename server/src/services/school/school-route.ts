import * as school from './school-controller'
import { Router } from 'express'
import { Route } from '../../types/Route'

const router = Router({
  mergeParams: true,
})

router.post('/name', school.schoolGetName)

export const schoolRoute = {
  path: 'school',
  router: router,
} as Route
