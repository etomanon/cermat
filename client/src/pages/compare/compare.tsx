import { useSchool } from '@/api/fetchers/school/school'
import { ControlLink } from '@/components/control/control-link'
import { Form } from '@/components/form/form'
import { Option } from '@/components/form/form-autocomplete'
import { EnumRoutePath } from '@/router/routes'
import { schoolCompareSet } from '@/store/modules/school/school'
import { getSchoolUrl } from '@/store/modules/school/school-utils'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { Box, Button, Typography } from '@material-ui/core'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { SchoolParams } from '../school/school'
import CloseIcon from '@material-ui/icons/Close'
import { FormAutocompleteRemote } from '@/components/form/form-autocomplete-remote'
import { School } from '@/store/modules/school/school-types'

type FormData = {
  schoolCompare: Option<number> | null
}

const defaultValues: Partial<FormData> = {
  schoolCompare: null,
}

export const Compare = () => {
  const [schools, setSchools] = useState<School[]>([])
  const dispatch = useAppDispatch()
  const school = useAppSelector((state) => state.school.schoolSelectedCompare)
  const { redizoCompare, redizo } = useParams<SchoolParams>()
  const { push } = useHistory()
  const methods = useForm<FormData>({ defaultValues })
  const { handleSubmit } = methods

  const onChangeOptions = useCallback((data: School[]) => setSchools(data), [])

  const formatOptions = useCallback(
    (data: School[]) =>
      data
        ?.filter((d) => d.redizo !== redizo)
        .map((d) => ({ value: d.id, label: `${d.name} (${d.redizo})` })) ?? [],
    [redizo]
  )
  const schoolUrl = useMemo(
    () => (redizoCompare ? getSchoolUrl(redizoCompare) : ''),
    [redizoCompare]
  )
  const onSubmit = useCallback(
    (formData: FormData) => {
      const school = schools.find?.(
        (d) => d.id === formData.schoolCompare?.value
      )
      if (school) {
        dispatch(schoolCompareSet(school))
        push(
          `${EnumRoutePath.SCHOOL}/${redizo}${EnumRoutePath.SCHOOL_COMPARE}/${school.redizo}`
        )
        return
      }
    },
    [schools, dispatch, push, redizo]
  )

  const onCancel = useCallback(() => {
    dispatch(schoolCompareSet(undefined))
    push(`${EnumRoutePath.SCHOOL}/${redizo}`)
  }, [dispatch, push, redizo])

  return (
    <>
      {redizoCompare && school && (
        <>
          <Box display="flex" justifyContent="center">
            <CloseIcon fontSize="large" color="secondary" />
          </Box>
          <Typography
            align="center"
            variant="h2"
          >{`(B) ${school.name}`}</Typography>
          <Typography align="center">
            <ControlLink url={schoolUrl} label={`Detail školy`} />
            &nbsp;(redizo: {school.redizo})
          </Typography>
          <Box mt="1rem" display="flex" justifyContent="center">
            <Button color="secondary" variant="outlined" onClick={onCancel}>
              Zrušit srovnání
            </Button>
          </Box>
        </>
      )}
      <Form onSubmit={onSubmit} methods={methods}>
        <Box display="flex" justifyContent="center" mt="1rem">
          <Box width={[1, '50rem']}>
            <FormAutocompleteRemote
              useFetch={useSchool}
              formatOptions={formatOptions}
              onChangeOptions={onChangeOptions}
              autocompleteProps={{
                id: 'schoolCompare',
                onChange: handleSubmit(onSubmit),
                placeholder: 'Hledej název školy / REDIZO',
                label: 'Škola pro porovnání',
              }}
            />
          </Box>
        </Box>
      </Form>
    </>
  )
}
