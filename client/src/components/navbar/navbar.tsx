import { AppBar, Box, Theme, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { LayoutWrapper } from '../layout/layout-wrapper'
import { NavbarPanel } from './navbar-panel'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useHistory } from 'react-router-dom'
import SchoolIcon from '@material-ui/icons/School'
import { Flex } from '../layout/Flex'
import { EnumRoutePath } from '@/router/routes'
import { NameStyled } from './navbar-styles'
import { ITEMS } from './utils'
import { ControlNavLink } from '../control/control-nav-link'

export const Navbar = () => {
  const { push } = useHistory()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  return (
    <>
      <AppBar position="static">
        <LayoutWrapper>
          <Toolbar disableGutters>
            <NameStyled
              alignItems="center"
              onClick={() => push(EnumRoutePath.HOME)}
            >
              <SchoolIcon fontSize="large" />
              <Box ml="2rem">
                <Typography variant="h3">Maturoid</Typography>
              </Box>
            </NameStyled>
            {isMobile ? (
              <NavbarPanel />
            ) : (
              <Flex ml="auto">
                {ITEMS.map((item) => (
                  <Box key={item.path} ml="3rem">
                    <ControlNavLink to={item.path}>
                      <Typography color="inherit">{item.label}</Typography>
                    </ControlNavLink>
                  </Box>
                ))}
              </Flex>
            )}
          </Toolbar>
        </LayoutWrapper>
      </AppBar>
      {/* <Toolbar /> */}
    </>
  )
}
