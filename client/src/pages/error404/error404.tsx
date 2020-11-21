import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { Typography } from '@material-ui/core'
import React from 'react'

export const Error404 = () => (
  <LayoutWrapper mt="2rem" display="flex" justifyContent="center">
    <Typography variant="h2">Nenalezeno - 404</Typography>
  </LayoutWrapper>
)
