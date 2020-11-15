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
import { Box } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  onChangeFilter: (filter: Filter) => void
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

export const ResultsFilter = ({ onChangeFilter }: Props) => {
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

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Box display="flex" ml="1.2rem" mt="1rem" flexWrap="wrap">
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
        </Box>
      </Form>
    </>
  )
}
