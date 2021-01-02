import { Form } from '@/components/form/form'
import { FormAutocomplete, Option } from '@/components/form/form-autocomplete'
import { FormTextField } from '@/components/form/form-text-field'
import { Flex } from '@/components/layout/Flex'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { EnumSubject } from '@/store/modules/school/school-types'
import {
  SUBJECTS_OPTIONS,
  YEARS_OPTIONS,
} from '@/store/modules/school/school-utils'
import { useGeolocation } from '@/utils/hooks/useGeolocation'
import { stringToFloat } from '@/utils/string/string-to-float'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { debounce, first } from 'lodash'
import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { RadiusApi, RadiusApiType } from './radius-api'

type FormData = {
  lng: string | number
  lat: string | number
  radius: string | number
  subject: Option<EnumSubject>
  year: Option<number>
}

const defaultValues: FormData = {
  lng: 0,
  lat: 0,
  radius: 50,
  subject: SUBJECTS_OPTIONS.find(
    (o) => o.value === EnumSubject.MEAN
  ) as Option<EnumSubject>,
  year: first(YEARS_OPTIONS) as Option<number>,
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
  radius: yup
    .number()
    .typeError('Zadejte číslo')
    .required('Povinné')
    .min(0, 'Min 0'),
})

export const Radius = () => {
  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const [init, setInit] = useState(false)
  const { setValue, handleSubmit } = methods
  const { loading, latitude, longitude } = useGeolocation()
  const [radiusApi, setRadiusApi] = useState<RadiusApiType | null>(null)

  const onSubmit = useCallback((data: FormData) => {
    setRadiusApi({
      subject: data.subject.value,
      year: data.year.value,
      radius: stringToFloat(data.radius) * 1000,
      geom: {
        type: 'Point',
        coordinates: [stringToFloat(data.lng), stringToFloat(data.lat)],
      },
    })
  }, [])

  const debounced = useMemo(
    () =>
      debounce(() => {
        handleSubmit(onSubmit)()
      }, 300),
    [handleSubmit, onSubmit]
  )

  const onChange = useCallback(() => debounced(), [debounced])

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

  return (
    <>
      <LayoutWrapper mt="2rem">
        <Typography align="center" variant="h2">
          Najděte maturitní výsledky s nejlepším percentilem úspěšnosti v daném
          rádiusu
        </Typography>
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
              mt: ['1rem', '1rem', '3rem'],
              flexWrap: 'wrap',
            }}
          >
            <Box width={[1, '11rem']} ml={[0, '1rem']}>
              <FormTextField
                textFieldProps={{
                  name: 'lng',
                  type: 'number',
                  label: 'Zem. délka',
                  onChange,
                  fullWidth: true,
                }}
              />
            </Box>
            <Box width={[1, '11rem']} ml={[0, '1rem']} mt={['2rem', 0]}>
              <FormTextField
                textFieldProps={{
                  name: 'lat',
                  type: 'number',
                  label: 'Zem. šířka',
                  onChange,
                  fullWidth: true,
                }}
              />
            </Box>
            <Box ml={[0, '3rem']} width={[1, '10rem']} mt={['2rem', 0]}>
              <FormTextField
                textFieldProps={{
                  name: 'radius',
                  type: 'number',
                  label: 'Rádius (km)',
                  onChange,
                  fullWidth: true,
                }}
              />
            </Box>
            <Flex
              ml="auto"
              width={[1, 1, 1, '60rem']}
              mt={['2rem', '2rem', '2rem', 0]}
              justifyContent={['center', 'center', 'center', 'flex-end']}
            >
              <Box
                width={[1, 1, 0.5]}
                pr={[0, 0, '1.5rem']}
                maxWidth={['auto', 'auto', '30rem']}
              >
                <FormAutocomplete
                  id="subject"
                  options={SUBJECTS_OPTIONS}
                  label="Předmět"
                  disableClearable
                  onChange={onChange}
                />
              </Box>
              <Box
                width={[1, 1, 0.5]}
                mt={['2rem', '2rem', 0]}
                maxWidth={['auto', 'auto', '20rem']}
              >
                <FormAutocomplete
                  id="year"
                  options={YEARS_OPTIONS}
                  label="Rok"
                  disableClearable
                  onChange={onChange}
                />
              </Box>
            </Flex>
          </Form>
        )}
        {radiusApi && <RadiusApi radiusApi={radiusApi} />}
      </LayoutWrapper>
    </>
  )
}
