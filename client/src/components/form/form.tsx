import { useLocalStorage } from '@/utils/hooks/useLocalStorage'
import { Box, BoxProps } from '@material-ui/core'
import {
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  sizing,
  SizingProps,
  spacing,
  SpacingProps,
} from '@material-ui/system'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FormProvider,
  FormProviderProps,
  UnpackNestedValue,
} from 'react-hook-form'
import styled from 'styled-components'

type FormStyledProps = SizingProps & SpacingProps & DisplayProps & FlexboxProps
const FormStyled = styled.form<FormStyledProps>`
  ${sizing}
  ${spacing}
  ${display}
  ${flexbox}
`

export type FormProps<T> = {
  onSubmit: (data: T) => void
  methods: Omit<FormProviderProps<T>, 'children'>
  storageKey?: string
  children?: React.ReactNode
  formProps?: FormStyledProps
}

export const Form = <T extends {}>({
  children,
  onSubmit,
  methods,
  storageKey,
  formProps,
}: FormProps<T>) => {
  // const { getValues, reset, handleSubmit } = methods
  // const [loaded, setLoaded] = useState(false)
  // const { storageValue, setStorageValue } = useLocalStorage(
  //   storageKey ?? '-1',
  //   null as UnpackNestedValue<T> | null
  // )
  // const onChange = useCallback(() => {
  //   console.log('changed init')
  //   if (!storageKey) {
  //     return
  //   }
  //   console.log('changed')
  //   setStorageValue(getValues())
  // }, [setStorageValue, storageKey, getValues])
  // useEffect(() => {
  //   if (!loaded && storageKey && storageValue) {
  //     reset(storageValue as any)
  //     setLoaded(true)
  //   }
  // }, [storageValue, reset, loaded, storageKey])
  return (
    <>
      <FormProvider {...methods}>
        <FormStyled
          onSubmit={methods.handleSubmit(onSubmit as any)}
          {...formProps}
        >
          {children}
        </FormStyled>
      </FormProvider>
    </>
  )
}
