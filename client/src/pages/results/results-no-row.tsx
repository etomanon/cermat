import { Typography } from '@material-ui/core'
import { GridOverlay } from '@material-ui/data-grid'
import React from 'react'

export const ResultsNoRows = () => {
  return (
    <GridOverlay>
      <Typography>Žádná data</Typography>
    </GridOverlay>
  )
}
