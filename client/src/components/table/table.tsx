import { useApi } from '@/api/swr'
import { Box, createStyles } from '@material-ui/core'
import {
  CellParams,
  Columns,
  DataGrid,
  DataGridProps,
  RowParams,
  SortModelParams,
} from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TableNoRows } from './table-no-row'
import {
  INIT_PAGE_SIZE,
  TablePagination,
  ROWS_PER_PAGE,
} from './table-pagination'

export type Filter = Record<string, any[]> | null

type Props = {
  url: string
  columns: Columns
  onRowClick?: (params: RowParams) => void
  onCellHover?: (params: CellParams) => void
  filter?: Filter
}

type Sort = {
  field: string
  order: 'ASC' | 'DESC'
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiDataGrid-row': {
        cursor: 'pointer',
      },
    },
  })
)

export const Table = <T extends { id: number }>({
  url,
  columns,
  onRowClick,
  onCellHover,
  filter,
}: Props) => {
  const classes = useStyles()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(INIT_PAGE_SIZE)
  const [sort, setSort] = useState<Sort | null>(null)

  const body = useMemo(
    () =>
      JSON.stringify({
        sort,
        pageSize: pageSize,
        page: page - 1,
        filter,
      }),
    [sort, pageSize, page, filter]
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
        pagination: TablePagination,
        noRowsOverlay: TableNoRows,
      },
      hideFooterRowCount: true,
      onRowClick,
      hideFooterSelectedRowCount: true,
      sortingOrder: ['desc', 'asc', null],
      onCellHover,
      className: classes.root,
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
      classes,
    ]
  )

  useEffect(() => {
    setPage(1)
  }, [sort, filter])

  return (
    <>
      <Box width={1} height="40rem">
        <DataGrid {...dataGridProps} />
      </Box>
    </>
  )
}
