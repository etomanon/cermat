import { ControlLink } from '@/components/control/control-link'
import { Option } from '@/components/form/form-autocomplete'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { SchoolResults } from '@/store/modules/school/school-types'
import { getSchoolUrl } from '@/store/modules/school/school-utils'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Box, Typography } from '@material-ui/core'
import React, { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { SchoolHistory } from './school-history'
import { SchoolSubjects } from './school-subjects'
import { TabContainer } from '@/components/tab/tab-container'
import { Compare } from '../compare/compare'
import { useParams } from 'react-router-dom'
import { SchoolParams } from './school'
import { CompareSubjects } from '../compare/compare-subjects'
import { years, subjects, SchoolFilter } from './school-filter'
import { CompareHistory } from '../compare/compare-history'

type Props = {
  schoolResults?: SchoolResults
  schoolResultsCompare?: SchoolResults
}

type FormData = {
  year: Option<number>
  subjects: Option<string>[]
}

const getDefaultValuesInit = (): FormData => ({
  year: years[years.length - 1],
  subjects: subjects,
})

const schema = yup.object().shape({
  year: yup.object().nullable().required('Povinné'),
})

export const SchoolInfo = ({ schoolResults, schoolResultsCompare }: Props) => {
  const { redizoCompare } = useParams<SchoolParams>()
  const defaultValues = useMemo(() => getDefaultValuesInit(), [])
  const methods = useForm<FormData>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const { watch } = methods

  const schoolUrl = useMemo(
    () => (schoolResults ? getSchoolUrl(schoolResults.redizo) : ''),
    [schoolResults]
  )
  const watchForm = watch()

  const onSubmit = useCallback(() => undefined, [])

  return (
    <>
      <LayoutWrapper>
        <Box width={1} pt="2rem" />
        <Typography align="center" variant="h2">{`${
          redizoCompare ? '(A) ' : ''
        }${schoolResults?.name}`}</Typography>
        <Typography align="center">
          <ControlLink url={schoolUrl} label={`Detail školy`} />
          &nbsp;(redizo: {schoolResults?.redizo})
        </Typography>
        <Compare />

        <Box mt="2rem">
          {redizoCompare ? (
            <TabContainer
              tabs={[
                {
                  label: 'Historie předmětů',
                  render: (
                    <>
                      <SchoolFilter
                        propsForm={{
                          methods,
                          onSubmit,
                        }}
                        hideYear
                      />
                      <CompareHistory
                        schoolResultsA={schoolResults}
                        schoolResultsB={schoolResultsCompare}
                        subjects={watchForm.subjects}
                      />
                    </>
                  ),
                },
                {
                  label: 'Detaily předmětů',
                  // eslint-disable-next-line react/display-name
                  render: (
                    <>
                      <SchoolFilter
                        propsForm={{
                          methods,
                          onSubmit,
                        }}
                      />
                      {watchForm.year?.value && schoolResultsCompare && (
                        <CompareSubjects
                          schoolResultsA={schoolResults}
                          schoolResultsB={schoolResultsCompare}
                          year={watchForm.year.value}
                          subjects={watchForm.subjects}
                        />
                      )}
                    </>
                  ),
                },
              ]}
            />
          ) : (
            <TabContainer
              tabs={[
                {
                  label: 'Historie předmětů',
                  render: (
                    <>
                      <SchoolFilter
                        propsForm={{
                          methods,
                          onSubmit,
                        }}
                        hideYear
                      />
                      <SchoolHistory
                        schoolResults={schoolResults}
                        subjects={watchForm.subjects}
                      />
                    </>
                  ),
                },
                {
                  label: 'Detaily předmětů',
                  // eslint-disable-next-line react/display-name
                  render: () => (
                    <>
                      <SchoolFilter
                        propsForm={{
                          methods,
                          onSubmit,
                        }}
                      />

                      <SchoolSubjects
                        schoolResults={schoolResults}
                        year={watchForm.year.value}
                        subjects={watchForm.subjects}
                      />
                    </>
                  ),
                },
              ]}
            />
          )}
        </Box>
      </LayoutWrapper>
    </>
  )
}
