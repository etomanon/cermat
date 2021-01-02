import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export type Radio = {
  value: string
  label?: string
}

type Props = {
  id: string
  radios: Radio[]
  label?: string
}

export const FormRadioGroup = ({ id, label, radios }: Props) => {
  const { control } = useFormContext()
  return (
    <Controller
      render={(props) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel htmlFor={props.name} component="legend">
              {label}
            </FormLabel>
          )}
          <RadioGroup
            name={props.name}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            onBlur={props.onBlur}
          >
            {radios.map((r) => (
              <FormControlLabel
                key={r.value}
                value={r.value}
                control={<Radio />}
                label={r.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      name={id}
      control={control as any}
    />
  )
}
