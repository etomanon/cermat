import { useSchool } from '@/api/fetchers/school/school'
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import React, { useCallback, useState } from 'react'
import { useStyles } from './navbar-styles'

export const Navbar = () => {
  const classes = useStyles()
  const [name, setName] = useState('')

  const { data } = useSchool(name)

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  )

  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('fetch', e.currentTarget.value)
    }
  }, [])
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Cermat
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Hledej název školy / REDIZO"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={onChange}
              onKeyUp={onKeyUp}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
