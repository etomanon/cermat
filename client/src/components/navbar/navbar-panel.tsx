import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { useStyles } from './navbar-styles'
import HomeIcon from '@material-ui/icons/Home'
import TableChartIcon from '@material-ui/icons/TableChart'
import { EnumRoutePath } from '@/router/routes'
import { useHistory } from 'react-router-dom'

const iOS =
  (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
type Item = {
  label: string
  Icon: React.ReactNode
  path: EnumRoutePath
}
const items: Item[] = [
  {
    label: 'Domů',
    Icon: <HomeIcon color="primary" />,
    path: EnumRoutePath.HOME,
  },
  {
    label: 'Tabulka',
    Icon: <TableChartIcon color="primary" />,
    path: EnumRoutePath.RESULTS,
  },
]

export const NavbarPanel = () => {
  const [open, setOpen] = useState(false)
  const { push } = useHistory()
  const onClick = useCallback(() => setOpen((prev) => !prev), [])
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])
  const onNavigation = useCallback(
    (path: EnumRoutePath) => {
      push(path)
      setOpen(false)
    },
    [push]
  )
  const classes = useStyles()
  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        onClick={onClick}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <div>
          <List>
            {items.map(({ label, Icon, path }) => (
              <ListItem button key={label} onClick={() => onNavigation(path)}>
                <ListItemIcon>{Icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </>
  )
}
