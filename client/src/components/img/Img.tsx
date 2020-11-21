import { Box, BoxProps } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

type Props = {
  src: string
  alt: string
}

export const Img = ({ src, alt, ...boxProps }: Props & BoxProps) => {
  return (
    <Box width={1} height={1} {...boxProps}>
      <Image src={src} alt={alt} />
    </Box>
  )
}

const Image = styled.img`
  width: 100%;
  height: 100%;
`
