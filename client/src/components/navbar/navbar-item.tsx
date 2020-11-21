import { EnumRoutePath } from '@/router/routes'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Item } from './utils'
import { useStyles } from './navbar-styles'

type Props = {
  item: Item
  onNavigation: (path: EnumRoutePath) => void
}

export const NavbarItem = ({
  onNavigation,
  item: { label, path, Icon },
}: Props) => {
  const isMatch = useRouteMatch({
    path,
    exact: true,
  })
  const classes = useStyles()
  return (
    <ListItem button key={label} onClick={() => onNavigation(path)}>
      <ListItemIcon
        className={isMatch ? classes.itemIconActive : classes.itemIcon}
      >
        {Icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
}
