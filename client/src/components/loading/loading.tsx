import { LinearProgress, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

type Props = {
  isValidating?: boolean
  error: Error
}

export const Loading = ({ isValidating, error }: Props) => {
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (isValidating) {
      timeout = setTimeout(() => {
        setShowLoader(true)
      }, 250)
    } else {
      if (timeout) {
        clearTimeout(timeout)
      }
      setShowLoader(false)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isValidating])
  if (error) {
    return (
      <Typography color="secondary" variant="h5">
        Chyba serveru.
      </Typography>
    )
  }
  if (isValidating && showLoader) {
    return <LinearProgress />
  }
  return null
}
