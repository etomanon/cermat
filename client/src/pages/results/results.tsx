import React, { useCallback } from 'react'
import { ResultsTable } from './results-table'
import { Box } from '@material-ui/core'
import { Result } from './types'
import { Columns, RowParams } from '@material-ui/data-grid'
import { parseSchoolSubject } from '@/store/modules/school/school-utils'
import { EnumSubject } from '@/store/modules/school/school-types'
import { isNil } from 'lodash'
import { EnumRoutePath } from '@/router/routes'

export const Results = () => {
  const columns = React.useMemo<Columns>(
    () => [
      {
        field: 'school.name',
        headerName: 'Škola',
        width: 300,
        valueGetter: (params) => params.data?.school?.name,
        sortable: true,
      },
      {
        field: 'subject',
        headerName: 'Předmět',
        width: 220,
        valueFormatter: (params) =>
          parseSchoolSubject(params.value as EnumSubject),
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

  const onRowClick = useCallback((params: RowParams) => {
    const origin = window.location.origin
    const redizo = params.data?.school?.redizo
    if (redizo) {
      window.open(`${origin}${EnumRoutePath.SCHOOL}/${redizo}`, '_blank')
    }
  }, [])

  return (
    <Box width={1} mt="2rem" px="1rem">
      <ResultsTable<Result>
        url="result/table"
        columns={columns}
        onRowClick={onRowClick}
      />
    </Box>
  )
}
