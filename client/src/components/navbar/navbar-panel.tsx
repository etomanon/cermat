import { IconButton, List, SwipeableDrawer } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { useStyles } from './navbar-styles'
import { EnumRoutePath } from '@/router/routes'
import { useHistory } from 'react-router-dom'
import { NavbarItem } from './navbar-item'
import { ITEMS } from './utils'

const iOS =
  (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

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
        anchor="right"
      >
        <div>
          <List>
            {ITEMS.map((item) => (
              <NavbarItem
                key={item.path}
                item={item}
                onNavigation={onNavigation}
              />
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </>
  )
}
