import { Link } from '@material-ui/core'
import React from 'react'
import { CLASS_NAME_NAVLINK_ACTIVE, NavLinkStyled } from './control-styles'

type Props = {
  to: string
  children: React.ReactNode
  underline?: 'none' | 'always' | 'hover'
}
export const ControlNavLink = ({ to, children, underline }: Props) => {
  return (
    <NavLinkStyled to={to} activeClassName={CLASS_NAME_NAVLINK_ACTIVE} exact>
      <Link color="inherit" underline={underline} component="span">
        {children}
      </Link>
    </NavLinkStyled>
  )
}
