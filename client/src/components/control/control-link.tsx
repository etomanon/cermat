import React from 'react'
import { LinkStyled } from './control-styles'

type Props = {
  href: string
  children: React.ReactNode
}
export const ControlLink = ({ href, children }: Props) => {
  return (
    <LinkStyled href={href} target="_blank" rel="noopener" underline="always">
      {children}
    </LinkStyled>
  )
}
