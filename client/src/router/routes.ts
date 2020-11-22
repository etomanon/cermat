import { About } from '@/pages/about/about'
import { Home } from '@/pages/home/home'
import { Radius } from '@/pages/radius/radius'
import { Results } from '@/pages/results/results'
import { School } from '@/pages/school/school'

export enum EnumRoutePath {
  HOME = '/',
  SCHOOL = '/school',
  SCHOOL_COMPARE = '/compare',
  RESULTS = '/results',
  ABOUT = '/about',
  RADIUS = '/radius',
}

export interface Route {
  component: () => JSX.Element
  path: string
  disableExact?: boolean
}

export const routes: Route[] = [
  {
    component: Home,
    path: EnumRoutePath.HOME,
  },
  {
    component: School,
    path: `${EnumRoutePath.SCHOOL}/:redizo`,
    disableExact: false,
  },
  {
    component: School,
    path: `${EnumRoutePath.SCHOOL}/:redizo${EnumRoutePath.SCHOOL_COMPARE}/:redizoCompare`,
    disableExact: false,
  },
  {
    component: Results,
    path: EnumRoutePath.RESULTS,
  },
  {
    component: About,
    path: EnumRoutePath.ABOUT,
  },
  {
    component: Radius,
    path: EnumRoutePath.RADIUS,
  },
]
