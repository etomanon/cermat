import { InputBaseClassKey, makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  option: {
    // Hover
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
    },
    // Selected
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
  },
}))

export type Option = {
  value: string | number
  label: string
}
type Props<T> = {
  id: string
  options: Option[]
  control: Control<T>
  label?: string
  onInputChange?: (value: string) => void
  classesInput?: Partial<Record<InputBaseClassKey, string>>
  isLoading?: boolean
  placeholder?: string
  onChange?: () => void
  classNameTextField?: string
  disableUnderline?: boolean
}

export const FormAutocomplete = <T extends {}>({
  id,
  options,
  label,
  control,
  onInputChange,
  classesInput,
  isLoading,
  placeholder,
  onChange,
  classNameTextField,
  disableUnderline,
}: Props<T>) => {
  const classes = useStyles()
  return (
    <Controller
      render={(props) => (
        <Autocomplete
          id={id}
          loading={isLoading}
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option) => option.value === props.value?.value}
          renderInput={(params) => (
            <TextField
              {...params}
              classes={classesInput}
              label={label}
              variant="standard"
              placeholder={placeholder}
              className={classNameTextField}
              InputProps={{
                disableUnderline,
                ...params.InputProps,
              }}
            />
          )}
          onChange={(_, data) => {
            props.onChange(data)
            onChange?.()
          }}
          onInputChange={(e, value) => onInputChange?.(value)}
          noOptionsText="Nic nenalezeno"
          loadingText="Načítám..."
          autoHighlight
          classes={{
            option: classes.option,
          }}
        />
      )}
      name={id}
      control={control as any}
    />
  )
}
