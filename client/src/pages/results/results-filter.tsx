import { useSchool } from '@/api/fetchers/school/school'
import { Form } from '@/components/form/form'
import { FormAutocomplete, Option } from '@/components/form/form-autocomplete'
import { FormAutocompleteRemote } from '@/components/form/form-autocomplete-remote'
import { Filter } from '@/components/table/table'
import { School } from '@/store/modules/school/school-types'
import {
  REGIONS_OPTIONS,
  SUBJECTS_OPTIONS,
  YEARS_OPTIONS,
} from '@/store/modules/school/school-utils'
import { Box, Button } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import { useForm } from 'react-hook-form'
import { ResultsGeom } from './results-geom'

type Props = {
  onChangeFilter: (filter: Filter) => void
  onChangeGeom: (geom: GeoJSON.Point | null) => void
  geom: GeoJSON.Point | null
}

type FormData = {
  school: {
    id: Option<number>[]
    region: Option<string>[]
  }
  subject: Option<string>[]
  year: Option<string>[]
}

const defaultValues: FormData = {
  school: {
    id: [],
    region: [],
  },
  subject: [],
  year: [],
}

export const ResultsFilter = ({
  onChangeFilter,
  onChangeGeom,
  geom,
}: Props) => {
  const [orderByLocation, setOrderByLocation] = useState(false)

  const methods = useForm<FormData>({ defaultValues })
  const { handleSubmit } = methods
  const onSubmit = useCallback(
    (data: FormData) => {
      onChangeFilter({
        'school.id': data.school.id.map((n) => n.value),
        'school.region': data.school.region.map((s) => s.value),
        subject: data.subject.map((s) => s.value),
        year: data.year.map((s) => s.value),
      })
    },
    [onChangeFilter]
  )

  const formatOptions = useCallback(
    (data: School[]) =>
      data.map?.((d) => ({
        value: d.id,
        label: `${d.name} (${d.redizo})`,
      })) ?? [],
    []
  )

  useEffect(() => {
    if (geom === null) {
      setOrderByLocation(false)
    }
  }, [geom])

  return (
    <>
      <Box display="flex" ml="1.2rem" mt="1rem" flexWrap="wrap">
        <Form
          methods={methods}
          onSubmit={onSubmit}
          formProps={{
            display: 'flex',
            width: [1, 1, 'auto'],
            flexWrap: 'wrap',
          }}
        >
          <Box width={[1, 1, '30rem']} px="1rem" mt={['1rem', '1rem', 0]}>
            <FormAutocompleteRemote
              useFetch={useSchool}
              formatOptions={formatOptions}
              autocompleteProps={{
                id: 'school.id',
                onChange: handleSubmit(onSubmit),
                placeholder: 'Hledej název školy / REDIZO',
                label: 'Školy',
                multiple: true,
              }}
            />
          </Box>
          <Box width={[1, 1, '18rem']} px="1rem" mt={['1rem', '1rem', 0]}>
            <FormAutocomplete
              id="school.region"
              options={REGIONS_OPTIONS}
              label="Kraje"
              multiple
              onChange={handleSubmit(onSubmit)}
            />
          </Box>
          <Box width={[1, 1, '22rem']} px="1rem" mt={['1rem', '1rem', 0]}>
            <FormAutocomplete
              id="subject"
              options={SUBJECTS_OPTIONS}
              label="Předměty"
              multiple
              onChange={handleSubmit(onSubmit)}
            />
          </Box>
          <Box width={[1, 1, '18rem']} px="1rem" mt={['1rem', '1rem', 0]}>
            <FormAutocomplete
              id="year"
              options={YEARS_OPTIONS}
              label="Roky"
              multiple
              onChange={handleSubmit(onSubmit)}
            />
          </Box>
        </Form>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          width={[1, 1, 'auto']}
          px="1rem"
          mt={['1rem', '1rem', 0]}
          pt={[0, 0, '1rem']}
        >
          <Button
            variant={geom && orderByLocation ? 'contained' : 'outlined'}
            color="primary"
            startIcon={<MyLocationIcon />}
            onClick={() => {
              if (geom && orderByLocation) {
                setOrderByLocation(false)
                onChangeGeom(null)
                return
              }
              setOrderByLocation(true)
            }}
          >
            Seřadit od nejbližší školy
          </Button>
          {orderByLocation && (
            <ResultsGeom
              orderByLocation={orderByLocation}
              onChangeGeom={onChangeGeom}
            />
          )}
        </Box>
      </Box>
    </>
  )
}
