import { ControlLink } from '@/components/control/control-link'
import { Form } from '@/components/form/form'
import { FormAutocomplete, Option } from '@/components/form/form-autocomplete'
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
import { TabContainer } from '@/components/tab/tab-container'

type Props = {
  schoolResults: SchoolResults
}

type FormData = {
  year: Option
}

const years = range(2013, 2021).map((n) => ({
  value: n,
  label: n.toString(),
}))

const defaultValuesInit: FormData = {
  year: years[years.length - 1],
}

const schema = yup.object().shape({
  year: yup.object().nullable().required('Povinné'),
})

export const SchoolInfo = ({ schoolResults }: Props) => {
  const methods = useForm<FormData>({
    defaultValues: defaultValuesInit,
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
          <ControlLink url={schoolUrl} label={`Detail školy`} />
          &nbsp;(redizo: {schoolResults.redizo})
        </Typography>
        <Box mt="2rem">
          <TabContainer
            tabs={[
              {
                label: 'Detaily předmětů',
                // eslint-disable-next-line react/display-name
                render: () => (
                  <>
                    <Form onSubmit={onSubmit} methods={methods}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        mt="2rem"
                        flexWrap="wrap"
                      >
                        <Box ml={[0, '4rem']} mt={['1rem', 0]} width={'20rem'}>
                          <FormAutocomplete
                            id="year"
                            options={years}
                            label="Rok"
                            disableClearable
                          />
                        </Box>
                      </Box>
                    </Form>
                    {watchForm.year?.value && (
                      <SchoolSubjects
                        schoolResults={schoolResults}
                        year={watchForm.year.value}
                      />
                    )}
                  </>
                ),
              },
              {
                label: 'Historie předmětů',
                render: <SchoolHistory schoolResults={schoolResults} />,
              },
            ]}
          />
        </Box>
      </LayoutWrapper>
    </>
  )
}
