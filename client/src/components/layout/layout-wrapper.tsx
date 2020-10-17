import { Box } from '@material-ui/core'
import React from 'react'

type Props = {
  children: React.ReactNode
}
export const LayoutWrapper = ({ children }: Props) => {
  return (
    <Box width={[1, 1, 1, '126rem']} px={'1rem'} mx="auto">
      {children}
    </Box>
  )
}
