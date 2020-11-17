import React, { useCallback, useState } from 'react'
import { Box, Grow, Paper, Popper } from '@material-ui/core'
import { Result } from './types'
import { CellParams, RowParams } from '@material-ui/data-grid'
import { EnumRoutePath } from '@/router/routes'
import { useResultsColumns } from './use-results-columns'
import { ResultsFilter } from './results-filter'
import { Filter, Table } from '@/components/table/table'

export const Results = () => {
  const columns = useResultsColumns()
  const [{ open, text, anchorEl }, setPoper] = useState({
    open: false,
    text: '',
    anchorEl: null as HTMLElement | null,
  })
  const [geom, setGeom] = useState<GeoJSON.Point | null>(null)
  const onChangeGeom = useCallback(
    (geom: GeoJSON.Point | null) => setGeom(geom),
    []
  )
  const [filter, setFilter] = useState<Filter>(null)

  const onChangeFilter = useCallback((filter: Filter) => setFilter(filter), [])

  const onRowClick = useCallback((params: RowParams) => {
    const origin = window.location.origin
    const redizo = params.data?.school?.redizo
    if (redizo) {
      window.open(`${origin}${EnumRoutePath.SCHOOL}/${redizo}`, '_blank')
    }
  }, [])

  const clearPoper = useCallback(
    () =>
      setPoper({
        open: false,
        text: '',
        anchorEl: null,
      }),
    []
  )

  const onCellHover = useCallback(
    (params: CellParams) => {
      if (['school.name', 'subject'].includes(params.colDef.field)) {
        setPoper({
          open: true,
          text: params.value?.toString() ?? '',
          anchorEl: params.element as HTMLElement,
        })
        return
      }
      clearPoper()
    },
    [clearPoper]
  )

  return (
    <>
      <ResultsFilter
        onChangeFilter={onChangeFilter}
        onChangeGeom={onChangeGeom}
        geom={geom}
      />
      <Box width={1} mt="2rem" px="1rem">
        <Box width={1} onMouseLeave={clearPoper}>
          <Table<Result>
            url="result/table"
            columns={columns}
            onRowClick={onRowClick}
            onCellHover={onCellHover}
            filter={filter}
            geom={geom}
            onChangeGeom={onChangeGeom}
          />
        </Box>
        <Popper open={open} anchorEl={anchorEl}>
          <div>
            <Grow in>
              <Paper>
                <Box py="0.5rem" px="1rem" maxWidth="25rem">
                  {text}
                </Box>
              </Paper>
            </Grow>
          </div>
        </Popper>
      </Box>
    </>
  )
}
