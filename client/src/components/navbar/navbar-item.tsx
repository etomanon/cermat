import { EnumRoutePath } from '@/router/routes'
import { ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Item } from './utils'
import { ItemStyled } from './navbar-styles'

type Props = {
  item: Item
  onNavigation: (path: EnumRoutePath) => void
}

export const NavbarItem = ({
  onNavigation,
  item: { label, path, Icon },
}: Props) => {
  const isMatch = Boolean(
    useRouteMatch({
      path,
      exact: true,
    })
  )
  return (
    <ListItem button key={label} onClick={() => onNavigation(path)}>
      <ItemStyled $active={isMatch}>{Icon}</ItemStyled>
      <ListItemText primary={label} />
    </ListItem>
  )
}
