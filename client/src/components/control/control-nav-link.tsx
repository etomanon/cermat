import React from 'react'
import { NavLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { useStyles } from './control-nav-link-styles'

type Props = {
  to: string
  children: React.ReactNode
  underline?: 'none' | 'always' | 'hover'
}
export const ControlNavLink = ({ to, children, underline }: Props) => {
  const classes = useStyles()
  return (
    <Link
      to={to}
      component={NavLink}
      activeClassName={classes.active}
      underline={underline}
      color="inherit"
      exact
    >
      {children}
    </Link>
  )
}
