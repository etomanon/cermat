import { Form } from '@/components/form/form'
import { FormTextField } from '@/components/form/form-text-field'
import { useGeolocation } from '@/utils/hooks/useGeolocation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress } from '@material-ui/core'
import React, { useEffect, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type FormData = {
  lng: string
  lat: string
}

const defaultValues: FormData = {
  lng: '0',
  lat: '0',
}

const schema = yup.object().shape({
  lng: yup
    .number()
    .typeError('Zadejte číslo')
    .required('Povinné')
    .max(180, 'Max 180')
    .min(-180, 'Min -180'),
  lat: yup
    .number()
    .typeError('Zadejte číslo')
    .required('Povinné')
    .max(90, 'Max 90')
    .min(-90, 'Min -90'),
})

type Props = {
  onChangeGeom: (geom: GeoJSON.Point | null) => void
  orderByLocation: boolean
}

export const ResultsGeom = ({ onChangeGeom, orderByLocation }: Props) => {
  const methods = useForm<FormData>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const [init, setInit] = useState(false)
  const { setValue, handleSubmit } = methods
  const { loading, latitude, longitude, error } = useGeolocation()

  const onSubmit = useCallback(
    (data: FormData) => {
      onChangeGeom({
        type: 'Point',
        coordinates: [parseFloat(data.lng), parseFloat(data.lat)],
      })
    },
    [onChangeGeom]
  )

  const onChange = useCallback(() => {
    handleSubmit(onSubmit)()
  }, [handleSubmit, onSubmit])

  useEffect(() => {
    if (init) {
      return
    }
    if (latitude && longitude && !init) {
      setValue('lat', latitude.toString())
      setValue('lng', longitude.toString())
      handleSubmit(onSubmit)()
      setInit(true)
    }
  }, [handleSubmit, latitude, longitude, onSubmit, setValue, init])

  useEffect(() => {
    if (error) {
      onChangeGeom({
        type: 'Point',
        coordinates: [0, 0],
      })
    }
  }, [error, onChangeGeom])

  useEffect(() => {
    if (orderByLocation) {
      onChange()
    }
  }, [orderByLocation, onChange])

  return (
    <>
      {loading && (
        <Box ml="1rem">
          <CircularProgress size="3rem" />
        </Box>
      )}
      {!loading && (
        <Form
          methods={methods}
          onSubmit={onSubmit}
          formProps={{
            display: 'flex',
            width: [1, 1, 'auto'],
            justifyContent: 'center',
            mt: ['1rem', '1rem', 0],
          }}
        >
          <Box width="11rem" ml="1rem">
            <FormTextField
              textFieldProps={{
                name: 'lng',
                type: 'number',
                label: 'Zem. délka',
                onChange,
              }}
            />
          </Box>
          <Box width="11rem" ml="1rem">
            <FormTextField
              textFieldProps={{
                name: 'lat',
                type: 'number',
                label: 'Zem. šířka',
                onChange,
              }}
            />
          </Box>
        </Form>
      )}
    </>
  )
}
