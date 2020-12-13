import { IconButton, ListItemIcon, ListItemIconProps } from '@material-ui/core'
import styled from 'styled-components'
import { Flex } from '../layout/Flex'
import React from 'react'

export const NameStyled = styled(Flex)`
  cursor: pointer;
`

export const MenuButtonStyled = styled(IconButton)`
  margin-left: auto;
  margin-right: 0.8rem;
`

export const ItemStyled = styled(
  (props: ListItemIconProps & { $active?: boolean }) => (
    <ListItemIcon {...props} />
  )
)`
  color: ${(props) =>
    props.$active
      ? props.theme.palette.secondary.main
      : props.theme.palette.primary.main};
`
