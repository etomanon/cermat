import React from 'react'
import { FormProvider, FormProviderProps } from 'react-hook-form'

type Props<T> = {
  children: React.ReactNode
  onSubmit: (data: T) => void
  methods: Omit<FormProviderProps<T>, 'children'>
}

export const Form = <T extends {}>({
  children,
  onSubmit,
  methods,
}: Props<T>) => {
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit as any)}>{children}</form>
      </FormProvider>
    </>
  )
}
