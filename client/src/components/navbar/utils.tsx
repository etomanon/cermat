import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import TableChartIcon from '@material-ui/icons/TableChart'
import InfoIcon from '@material-ui/icons/Info'
import { EnumRoutePath } from '@/router/routes'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import CloudDownload from '@material-ui/icons/CloudDownload'

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
  {
    label: 'Rádius',
    Icon: <GpsFixedIcon />,
    path: EnumRoutePath.RADIUS,
  },
  {
    label: 'Ke stažení',
    Icon: <CloudDownload />,
    path: EnumRoutePath.DOWNLOAD,
  },
  {
    label: 'O projektu',
    Icon: <InfoIcon />,
    path: EnumRoutePath.ABOUT,
  },
]
