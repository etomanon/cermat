import { useLocalStorage } from '@/utils/hooks/useLocalStorage'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FormProvider,
  FormProviderProps,
  UnpackNestedValue,
} from 'react-hook-form'

export type FormProps<T> = {
  onSubmit: (data: T) => void
  methods: Omit<FormProviderProps<T>, 'children'>
  storageKey?: string
  children?: React.ReactNode
}

export const Form = <T extends {}>({
  children,
  onSubmit,
  methods,
  storageKey,
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
        <form onSubmit={methods.handleSubmit(onSubmit as any)}>{children}</form>
      </FormProvider>
    </>
  )
}
