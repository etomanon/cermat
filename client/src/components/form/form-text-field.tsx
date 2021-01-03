import { TextField, TextFieldProps, Typography } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  textFieldProps: TextFieldProps
}

export const FormTextField = ({ textFieldProps }: Props) => {
  const { register, errors } = useFormContext()
  const error = errors[textFieldProps.name as string]?.message
  return (
    <>
      <TextField
        inputRef={register}
        {...textFieldProps}
        inputProps={
          textFieldProps.type === 'number'
            ? {
                step: 'any',
                ...textFieldProps.inputProps,
              }
            : textFieldProps.inputProps
        }
        error={Boolean(error) || textFieldProps.error}
      />
      {error && <Typography color="error">{error}</Typography>}
    </>
  )
}
