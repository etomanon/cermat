import { DataGrid, DataGridProps } from '@material-ui/data-grid'
import React from 'react'

type Props<T> = {
  dataGridProps: DataGridProps
}

export const ResultsTable = <T extends {}>({ dataGridProps }: Props<T>) => {
  return (
    <>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid {...dataGridProps} />
      </div>
    </>
  )
}
