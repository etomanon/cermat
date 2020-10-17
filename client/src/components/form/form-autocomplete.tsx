import {
  InputBaseClassKey,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

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
  value: number
  label: string
}
type Props<T> = {
  id: string
  options: Option[]
  label?: string
  onInputChange?: (value: string) => void
  classesInput?: Partial<Record<InputBaseClassKey, string>>
  isLoading?: boolean
  placeholder?: string
  onChange?: () => void
  classNameTextField?: string
  disableUnderline?: boolean
  disableClearable?: boolean
}

export const FormAutocomplete = <T extends {}>({
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
}: Props<T>) => {
  const { control, errors } = useFormContext()
  const error = errors[id]?.message
  const classes = useStyles()
  return (
    <>
      <Controller
        render={(props) => (
          <Autocomplete
            id={id}
            loading={isLoading}
            options={options}
            value={props.value}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option) => option.value === props.value?.value}
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
            classes={{
              option: classes.option,
            }}
            disableClearable={disableClearable}
          />
        )}
        name={id}
        control={control as any}
      />
    </>
  )
}
