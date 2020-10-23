import { Form, FormProps } from '@/components/form/form'
import { FormAutocomplete } from '@/components/form/form-autocomplete'
import { EnumSubject } from '@/store/modules/school/school-types'
import { parseSchoolSubject } from '@/store/modules/school/school-utils'
import { Box } from '@material-ui/core'
import { range } from 'lodash'
import React from 'react'

type Props<T> = {
  propsForm: FormProps<T>
  hideYear?: boolean
}

export const years = range(2013, 2021).map((n) => ({
  value: n,
  label: n.toString(),
}))

export const subjects = [
  {
    value: EnumSubject.CJ_DT,
    label: parseSchoolSubject(EnumSubject.CJ_DT),
  },
  {
    value: EnumSubject.CJ_UZ,
    label: parseSchoolSubject(EnumSubject.CJ_UZ),
  },
  {
    value: EnumSubject.MA,
    label: parseSchoolSubject(EnumSubject.MA),
  },
  {
    value: EnumSubject.AJ_DT,
    label: parseSchoolSubject(EnumSubject.AJ_DT),
  },
  {
    value: EnumSubject.AJ_UZ,
    label: parseSchoolSubject(EnumSubject.AJ_UZ),
  },
]

export const SchoolFilter = <T extends {}>({
  propsForm: { onSubmit, methods },
  hideYear,
}: Props<T>) => {
  return (
    <>
      <Box width={1} pt="2.5rem" />
      <Form onSubmit={onSubmit} methods={methods}>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          mx={[0, 0, 'auto']}
          width={[1, 1, '60rem']}
        >
          <Box width={[1, 1, 0.5]} px={[0, 0, '1.5rem']}>
            <FormAutocomplete
              id="subjects"
              options={subjects}
              label="Předměty"
              multiple
            />
          </Box>
          <Box
            width={[1, 1, 0.5]}
            px={[0, 0, '1.5rem']}
            mt={['2rem', '2rem', 0]}
            hidden={hideYear}
          >
            <FormAutocomplete
              id="year"
              options={years}
              label="Rok"
              disableClearable
            />
          </Box>
        </Box>
      </Form>
    </>
  )
}
