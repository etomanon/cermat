import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import TableChartIcon from '@material-ui/icons/TableChart'
import { EnumRoutePath } from '@/router/routes'

export type Item = {
  label: string
  Icon: React.ReactNode
  path: EnumRoutePath
}
export const ITEMS: Item[] = [
  {
    label: 'Domů',
    Icon: <HomeIcon />,
    path: EnumRoutePath.HOME,
  },
  {
    label: 'Tabulka',
    Icon: <TableChartIcon />,
    path: EnumRoutePath.RESULTS,
  },
]
