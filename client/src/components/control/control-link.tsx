import React from 'react'
import Link from '@material-ui/core/Link'
import { useStyles } from './control-styles'

type Props = {
  href: string
  children: React.ReactNode
}
export const ControlLink = ({ href, children }: Props) => {
  const classes = useStyles()
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      underline="always"
      className={classes.hover}
    >
      {children}
    </Link>
  )
}
