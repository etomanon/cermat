import React from 'react'
import { FormProvider, FormProviderProps } from 'react-hook-form'

export type FormProps<T> = {
  onSubmit: (data: T) => void
  methods: Omit<FormProviderProps<T>, 'children'>
  children?: React.ReactNode
}

export const Form = <T extends {}>({
  children,
  onSubmit,
  methods,
}: FormProps<T>) => {
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit as any)}>{children}</form>
      </FormProvider>
    </>
  )
}
