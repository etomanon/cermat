import React from 'react'
import Link from '@material-ui/core/Link'

type Props = {
  url: string
  label: string
}
export const ControlLink = ({ url, label }: Props) => {
  return (
    <Link href={url} target="_blank" rel="noopener" underline="always">
      {label}
    </Link>
  )
}
