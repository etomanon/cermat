import React from 'react'
import Link from '@material-ui/core/Link'
import { useStyles } from './control-styles'

type Props = {
  url: string
  children: React.ReactNode
}
export const ControlLink = ({ url, children }: Props) => {
  const classes = useStyles()
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener"
      underline="always"
      className={classes.hover}
    >
      {children}
    </Link>
  )
}
