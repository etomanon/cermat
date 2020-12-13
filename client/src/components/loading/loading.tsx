import { LinearProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

type Props = {
  isValidating?: boolean
  error: Error
}

export const Loading = ({ isValidating, error }: Props) => {
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    let timeout: number | null = null
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
    return <LinearProgressStyled />
  }
  return null
}

const LinearProgressStyled = styled(LinearProgress)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  z-index: 9999;
`
