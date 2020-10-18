import { ControlLink } from '@/components/control/control-link'
import { Form } from '@/components/form/form'
import { FormAutocomplete, Option } from '@/components/form/form-autocomplete'
import { FormRadioGroup, Radio } from '@/components/form/form-radio-group'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { SchoolResults } from '@/store/modules/school/school-types'
import { getSchoolUrl } from '@/store/modules/school/school-utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Typography } from '@material-ui/core'
import { range } from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { SchoolHistory } from './school-history'
import { SchoolSubjects } from './school-subjects'

type Props = {
  schoolResults: SchoolResults
}

enum EnumView {
  SUBJECTS = 'subjects',
  HISTORY = 'history',
}

const radios: Radio[] = [
  {
    value: EnumView.SUBJECTS,
    label: 'Detailech předmětů',
  },
  { value: EnumView.HISTORY, label: 'Historii předmětů' },
]

type FormData = {
  view: EnumView
  year: Option
}

const years = range(2013, 2021).map((n) => ({
  value: n,
  label: n.toString(),
}))

const defaultValues: FormData = {
  view: EnumView.SUBJECTS,
  year: years[years.length - 1],
}

const schema = yup.object().shape({
  year: yup.object().nullable().required('Povinné'),
})

export const SchoolInfo = ({ schoolResults }: Props) => {
  const methods = useForm<FormData>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const { watch } = methods
  const schoolUrl = useMemo(() => getSchoolUrl(schoolResults.redizo), [
    schoolResults,
  ])
  const watchForm = watch()

  const onSubmit = useCallback(() => undefined, [])

  return (
    <>
      <LayoutWrapper>
        <Box width={1} pt="2rem" />
        <Typography
          align="center"
          variant="h2"
        >{`${schoolResults.name}`}</Typography>
        <Typography align="center">
          <ControlLink
            url={schoolUrl}
            label={`Detail školy (redizo: ${schoolResults.redizo})`}
          />
        </Typography>
        <Form onSubmit={onSubmit} methods={methods}>
          <Box display="flex" justifyContent="center" mt="2rem" flexWrap="wrap">
            <Box width={[1, 'auto']} display="flex" justifyContent="center">
              <FormRadioGroup id="view" radios={radios} label="Informace o" />
            </Box>
            {watchForm.view === EnumView.SUBJECTS && (
              <Box ml={[0, '4rem']} mt={['1rem', 0]} width={'20rem'}>
                <FormAutocomplete
                  id="year"
                  options={years}
                  label="Rok"
                  disableClearable
                />
              </Box>
            )}
          </Box>
        </Form>
        {watchForm.view === EnumView.SUBJECTS && watchForm.year?.value && (
          <SchoolSubjects
            schoolResults={schoolResults}
            year={watchForm.year.value}
          />
        )}
        {watchForm.view === EnumView.HISTORY && (
          <SchoolHistory schoolResults={schoolResults} />
        )}
      </LayoutWrapper>
    </>
  )
}
