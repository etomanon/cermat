import { InputBaseClassKey, TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export type Option<T> = {
  value: T
  label: string
}
type Props<T> = {
  id: string
  options: Option<T>[]
  label?: string
  onInputChange?: (value: string) => void
  classesInput?: Partial<Record<InputBaseClassKey, string>>
  isLoading?: boolean
  placeholder?: string
  onChange?: () => void
  classNameTextField?: string
  disableUnderline?: boolean
  disableClearable?: boolean
  multiple?: boolean
  className?: string
}

export const FormAutocomplete = <T extends string | number>({
  id,
  options,
  label,
  onInputChange,
  classesInput,
  isLoading,
  placeholder,
  onChange,
  classNameTextField,
  disableUnderline,
  disableClearable,
  multiple,
  className,
}: Props<T>) => {
  const { control, errors } = useFormContext()
  const error = errors[id]?.message
  return (
    <>
      <Controller
        name={id}
        control={control}
        render={(props) => (
          <Autocomplete<Option<T>, boolean, boolean>
            id={props.name}
            loading={isLoading}
            options={options}
            value={props.value}
            getOptionLabel={(option) => option.label ?? ''}
            getOptionSelected={(option, value) => option.value === value.value}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  classes={classesInput}
                  label={label}
                  variant="standard"
                  placeholder={placeholder}
                  className={classNameTextField}
                  error={error}
                  InputProps={{
                    disableUnderline,
                    ...params.InputProps,
                  }}
                />
                {error && <Typography color="error">{error}</Typography>}
              </>
            )}
            onChange={(_, data) => {
              props.onChange(data)
              onChange?.()
            }}
            onInputChange={(e, value) => onInputChange?.(value)}
            noOptionsText="Nic nenalezeno"
            loadingText="Načítám..."
            autoHighlight
            className={className}
            disableClearable={disableClearable}
            openOnFocus
            onBlur={props.onBlur}
            multiple={multiple ?? false}
            limitTags={1}
            disableCloseOnSelect={multiple}
            fullWidth
          />
        )}
      />
    </>
  )
}
