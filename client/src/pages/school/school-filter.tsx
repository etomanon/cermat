import { Form, FormProps } from '@/components/form/form'
import { FormAutocomplete } from '@/components/form/form-autocomplete'
import {
  SUBJECTS_OPTIONS,
  YEARS_OPTIONS,
} from '@/store/modules/school/school-utils'
import { ObjectAny } from '@/utils/types/object-any'
import { Box } from '@material-ui/core'
import React from 'react'

type Props<T> = {
  propsForm: FormProps<T>
  hideYear?: boolean
}

export const SchoolFilter = <T extends ObjectAny>({
  propsForm: { onSubmit, methods },
  hideYear,
}: Props<T>) => {
  return (
    <>
      <Box width={1} pt="2.5rem" />
      <Form onSubmit={onSubmit} methods={methods} storageKey="school-form">
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
              options={SUBJECTS_OPTIONS}
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
              options={YEARS_OPTIONS}
              label="Rok"
              disableClearable
            />
          </Box>
        </Box>
      </Form>
    </>
  )
}
