import { Home } from '@/pages/home/home'
import { School } from '@/pages/school/school'

export enum RoutePathEnum {
  HOME = '/',
  SCHOOL = '/school',
  SCHOOL_COMPARE = '/compare',
}

export interface Route {
  component: () => JSX.Element
  path: string
  disableExact?: boolean
}

export const routes: Route[] = [
  {
    component: Home,
    path: RoutePathEnum.HOME,
  },
  {
    component: School,
    path: `${RoutePathEnum.SCHOOL}/:redizo`,
    disableExact: false,
  },
  {
    component: School,
    path: `${RoutePathEnum.SCHOOL}/:redizo${RoutePathEnum.SCHOOL_COMPARE}/:redizoCompare`,
    disableExact: false,
  },
]
