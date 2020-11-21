import { Box, BoxProps } from '@material-ui/core'
import React from 'react'

type Props = {
  children: React.ReactNode
}
export const LayoutWrapper = ({ children, ...boxProps }: Props & BoxProps) => {
  return (
    <Box width={[1, 1, 1, '126rem']} px={'1rem'} mx="auto" {...boxProps}>
      {children}
    </Box>
  )
}
