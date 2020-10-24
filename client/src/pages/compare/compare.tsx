import { useSchool } from '@/api/fetchers/school/school'
import { ControlLink } from '@/components/control/control-link'
import { Form } from '@/components/form/form'
import { FormAutocomplete, Option } from '@/components/form/form-autocomplete'
import { RoutePathEnum } from '@/router/routes'
import { schoolCompareSet } from '@/store/modules/school/school'
import { getSchoolUrl } from '@/store/modules/school/school-utils'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { Box, Button, Typography } from '@material-ui/core'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { SchoolParams } from '../school/school'
import CloseIcon from '@material-ui/icons/Close'

type FormData = {
  schoolCompare: Option<number> | null
}

const defaultValues: Partial<FormData> = {
  schoolCompare: null,
}

export const Compare = () => {
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const school = useAppSelector((state) => state.school.schoolSelectedCompare)
  const { redizoCompare, redizo } = useParams<SchoolParams>()
  const { data, isValidating } = useSchool(name)
  const { push } = useHistory()
  const methods = useForm<FormData>({ defaultValues })
  const { handleSubmit } = methods

  const options = useMemo(
    () =>
      data
        ?.filter((d) => d.redizo !== redizo)
        .map((d) => ({ value: d.id, label: `${d.name} (${d.redizo})` })) ?? [],
    [data, redizo]
  )
  const schoolUrl = useMemo(
    () => (redizoCompare ? getSchoolUrl(redizoCompare) : ''),
    [redizoCompare]
  )
  const onInputChange = useCallback((value: string) => setName(value), [])
  const onSubmit = useCallback(
    (formData: FormData) => {
      const school = data?.find?.((d) => d.id === formData.schoolCompare?.value)
      if (school) {
        dispatch(schoolCompareSet(school))
        push(
          `${RoutePathEnum.SCHOOL}/${redizo}${RoutePathEnum.SCHOOL_COMPARE}/${school.redizo}`
        )
        return
      }
    },
    [data, dispatch, push, redizo]
  )

  const onCancel = useCallback(() => {
    dispatch(schoolCompareSet(undefined))
    push(`${RoutePathEnum.SCHOOL}/${redizo}`)
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
            <FormAutocomplete
              id="schoolCompare"
              options={options}
              onChange={handleSubmit(onSubmit)}
              onInputChange={onInputChange}
              isLoading={isValidating}
              placeholder="Hledej název školy / REDIZO"
              label="Škola pro porovnání"
            />
          </Box>
        </Box>
      </Form>
    </>
  )
}
