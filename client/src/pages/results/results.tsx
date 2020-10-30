import React, { useCallback, useMemo, useState } from 'react'
import { useApi } from '@/api/swr'
import { Result } from './types'
import { ResultsTable } from './results-table'
import { DataGridProps, SortModelParams } from '@material-ui/data-grid'
import { Box } from '@material-ui/core'

export const Results = () => {
  // TODO: Filters
  const [filter, setFilter] = useState({
    name: 'asd',
  })
  const { data: dataApi, isValidating } = useApi<Result[]>({
    url: 'result/table',
    init: {
      method: 'POST',
      body: JSON.stringify({
        ...filter,
      }),
    },
  })

  const rows = useMemo(() => dataApi ?? [], [dataApi])
  const columns = React.useMemo(
    () => [
      { field: 'signed', headerName: 'Signed', width: 78 },
      { field: 'subject', headerName: 'Subject', width: 150 },
    ],
    []
  )
  const onSortModelChange = useCallback((params: SortModelParams) => {
    console.log('params', params)
  }, [])
  const dataGridProps = useMemo<DataGridProps>(
    () => ({
      columns,
      rows,
      disableSelectionOnClick: true,
      rowsPerPageOptions: [100],
      pageSize: 100,
      onSortModelChange,
      hideFooter: true,
      // disableExtendRowFullWidth: true,
      columnBuffer: 0,
    }),
    [columns, rows, onSortModelChange]
  )

  return (
    <Box width={1}>
      <ResultsTable dataGridProps={dataGridProps} />
    </Box>
  )
}
