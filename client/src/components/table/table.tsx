import { useApi } from '@/api/swr'
import { Box, createStyles } from '@material-ui/core'
import {
  CellParams,
  Columns,
  DataGrid,
  DataGridProps,
  RowParams,
  SortDirection,
  SortModel,
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
import { TableRef } from './table-ref'

export type Filter = Record<string, any[]> | null

type Props = {
  url: string
  columns: Columns
  onRowClick?: (params: RowParams) => void
  onCellHover?: (params: CellParams) => void
  filter?: Filter
  geom: GeoJSON.Point | null
  onChangeGeom?: (geom: GeoJSON.Point | null) => void
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
  geom,
  onChangeGeom,
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
        geom,
      }),
    [sort, pageSize, page, filter, geom]
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

  const sortModel = useMemo<SortModel>(
    () =>
      sort
        ? [
            {
              field: sort.field,
              sort: sort.order.toLowerCase() as SortDirection,
            },
          ]
        : [],
    [sort]
  )

  const onSortModelChange = useCallback(
    (params: SortModelParams) => {
      const sortModel = params.sortModel[0]
      if (
        sortModel &&
        (sortModel.field !== sort?.field ||
          sortModel.sort?.toUpperCase() !== sort?.order)
      ) {
        setSort({
          field: sortModel.field,
          order: sortModel.sort?.toUpperCase() as 'ASC' | 'DESC',
        })
        return
      }
      if (params.sortModel.length === 0) {
        setSort(null)
      }
    },
    [sort]
  )

  const dataGridProps = useMemo<DataGridProps>(
    () => ({
      columns,
      rows,
      disableSelectionOnClick: false,
      onSortModelChange,
      // not working ATM
      // sortModel,
      columnBuffer: 0,
      autoHeight: true,
      rowsPerPageOptions: ROWS_PER_PAGE,
      pageSize: pageSize,
      onPageSizeChange: (param) => setPageSize(param.pageSize),
      page,
      paginationMode: 'server',
      sortingMode: 'server',
      rowCount: dataApi?.total,
      pagination: true,
      loading: isValidating,
      onPageChange: (param) => setPage(param.page),
      components: {
        pagination: TablePagination,
        noRowsOverlay: TableNoRows,
        // eslint-disable-next-line react/display-name
        header: (params) => <TableRef params={params} sortModel={sortModel} />,
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
      sortModel,
    ]
  )

  useEffect(() => {
    setPage(1)
  }, [sort, filter, geom])

  useEffect(() => {
    if (geom) {
      setSort(null)
    }
  }, [geom, onChangeGeom])

  useEffect(() => {
    if (sort) {
      onChangeGeom?.(null)
    }
  }, [sort, onChangeGeom])

  return (
    <>
      <Box width={1} height="40rem">
        <DataGrid {...dataGridProps} />
      </Box>
    </>
  )
}
