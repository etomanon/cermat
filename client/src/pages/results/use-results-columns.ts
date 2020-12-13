import { EnumSubject } from '@/store/modules/school/school-types'
import { parseSchoolSubject } from '@/store/modules/school/school-utils'
import { Columns } from '@material-ui/data-grid'
import { isNil } from 'lodash'
import { useMemo } from 'react'

export const useResultsColumns = () => {
  const columns = useMemo<Columns>(
    () => [
      {
        field: 'school.name',
        headerName: 'Škola',
        width: 300,
        valueGetter: (params) =>
          `${params.row?.school?.name} (${params.row?.school?.redizo})`,
        sortable: true,
      },
      {
        field: 'school.region',
        headerName: 'Kraj',
        width: 160,
        sortable: true,
        valueGetter: (params) => params.row?.school?.region,
      },
      {
        field: 'subject',
        headerName: 'Předmět',
        width: 220,
        valueGetter: (params) =>
          parseSchoolSubject(params.value as EnumSubject),
      },
      {
        field: 'year',
        headerName: 'Rok',
        width: 100,
      },
      {
        field: 'successPercentil',
        headerName: 'Percentilová úspěšnost',
        width: 100,
        type: 'number',
      },
      {
        field: 'shareChosen',
        headerName: 'Podíl volby předmětu',
        width: 100,
        type: 'number',
        valueFormatter: (params) =>
          isNil(params.value) ? `` : `${params.value} %`,
      },
      { field: 'signed', headerName: 'Přihlášení', width: 100, type: 'number' },
      { field: 'success', headerName: 'Úspěšní', width: 100, type: 'number' },
      { field: 'failed', headerName: 'Neúspěšní', width: 100, type: 'number' },
      { field: 'tested', headerName: 'Testovaní', width: 100, type: 'number' },
      { field: 'excused', headerName: 'Omluvení', width: 100, type: 'number' },
      {
        field: 'expelled',
        headerName: 'Vyloučení',
        width: 100,
        type: 'number',
      },
    ],
    []
  )

  return columns
}
