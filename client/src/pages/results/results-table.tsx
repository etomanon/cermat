import { useApi } from '@/api/swr'
import { Box } from '@material-ui/core'
import {
  CellParams,
  Columns,
  DataGrid,
  DataGridProps,
  RowParams,
  SortModelParams,
} from '@material-ui/data-grid'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  INIT_PAGE_SIZE,
  ResultsPagination,
  ROWS_PER_PAGE,
} from './results-pagination'

type Props = {
  url: string
  columns: Columns
  onRowClick?: (params: RowParams) => void
  onCellHover?: (params: CellParams) => void
}

type Sort = {
  field: string
  order: 'ASC' | 'DESC'
}

export const ResultsTable = <T extends { id: number }>({
  url,
  columns,
  onRowClick,
  onCellHover,
}: Props) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(INIT_PAGE_SIZE)
  const [sort, setSort] = useState<Sort | null>(null)

  const body = useMemo(
    () =>
      JSON.stringify({
        sort,
        pageSize: pageSize,
        page: page - 1,
      }),
    [sort, pageSize, page]
  )
  const { data: dataApi, isValidating } = useApi<{
    results: T[]
    total: number
  }>({
    key: `${url}/${body}`,
    url,
    init: {
      method: 'POST',
      body: body,
    },
  })

  const rows = useMemo(() => dataApi?.results ?? [], [dataApi])

  const onSortModelChange = useCallback((params: SortModelParams) => {
    const sort = params.sortModel[0]
    if (sort) {
      setSort({
        field: sort.field,
        order: sort.sort?.toUpperCase() as 'ASC' | 'DESC',
      })
      return
    }
    setSort(null)
  }, [])
  const dataGridProps = useMemo<DataGridProps>(
    () => ({
      columns,
      rows,
      disableSelectionOnClick: false,
      onSortModelChange,
      // disableExtendRowFullWidth: true,
      columnBuffer: 0,
      autoHeight: true,
      rowsPerPageOptions: ROWS_PER_PAGE,
      pageSize: pageSize,
      onPageSizeChange: (param) => setPageSize(param.pageSize),
      page,
      paginationMode: 'server',
      rowCount: dataApi?.total,
      pagination: true,
      loading: isValidating,
      onPageChange: (param) => setPage(param.page),
      components: {
        pagination: ResultsPagination,
      },
      hideFooterRowCount: true,
      onRowClick,
      hideFooterSelectedRowCount: true,
      sortingOrder: ['desc', 'asc', null],
      onCellHover,
    }),
    [
      columns,
      dataApi,
      rows,
      onSortModelChange,
      isValidating,
      page,
      pageSize,
      onRowClick,
      onCellHover,
    ]
  )

  useEffect(() => {
    setPage(1)
  }, [sort])

  return (
    <>
      <Box width={1} height="40rem">
        <DataGrid {...dataGridProps} />
      </Box>
    </>
  )
}
