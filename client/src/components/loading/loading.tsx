import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '1rem',
  },
}))

type Props = {
  isValidating?: boolean
  error: Error
}

export const Loading = ({ isValidating, error }: Props) => {
  const classes = useStyles()
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

  useEffect(() => {
    if (error) {
      toast.error('Chyba serveru', {
        toastId: 'Chyba serveru',
      })
    }
  }, [error])

  if (isValidating && showLoader) {
    return <LinearProgress classes={{ root: classes.root }} />
  }
  return null
}
