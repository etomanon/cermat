import Link from '@material-ui/core/Link'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const CLASS_NAME_NAVLINK_ACTIVE = 'navlink--active'

export const NavLinkStyled = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  &:hover,
  &.${CLASS_NAME_NAVLINK_ACTIVE} {
    text-decoration: underline;
  }
`

export const LinkStyled = styled(Link)`
  &:hover {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`
