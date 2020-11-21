import { EnumRoutePath } from '@/router/routes'
import { schoolSet } from '@/store/modules/school/school'
import { School } from '@/store/modules/school/school-types'
import { useAppDispatch, useAppSelector } from '@/store/store'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Option } from '../form/form-autocomplete'
import { useStyles } from './search-school-styles'
import SearchIcon from '@material-ui/icons/Search'
import { useSchool } from '@/api/fetchers/school/school'
import { Form } from '../form/form'
import { FormAutocompleteRemote } from '../form/form-autocomplete-remote'

type FormData = {
  school: Option<number> | null
}

const defaultValues: Partial<FormData> = {
  school: null,
}

export const SearchSchool = () => {
  const classes = useStyles()
  const [schools, setSchools] = useState<School[]>([])
  const dispatch = useAppDispatch()
  const schoolCompare = useAppSelector(
    (state) => state.school.schoolSelectedCompare
  )
  const { push } = useHistory()
  const methods = useForm<FormData>({ defaultValues })
  const { handleSubmit } = methods

  const onChangeOptions = useCallback((data: School[]) => setSchools(data), [])

  const formatOptions = useCallback(
    (data: School[]) =>
      data.map?.((d) => ({
        value: d.id,
        label: `${d.name} (${d.redizo})`,
      })) ?? [],
    []
  )
  const onSubmit = useCallback(
    (formData: FormData) => {
      const school = schools?.find?.((d) => d.id === formData.school?.value)
      if (school) {
        dispatch(schoolSet(school))
      }
      if (school && schoolCompare) {
        push(
          `${EnumRoutePath.SCHOOL}/${school.redizo}${EnumRoutePath.SCHOOL_COMPARE}/${schoolCompare.redizo}`
        )
        return
      }
      if (school) {
        push(`${EnumRoutePath.SCHOOL}/${school.redizo}`)
      }
    },
    [schools, dispatch, push, schoolCompare]
  )

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Form onSubmit={onSubmit} methods={methods}>
        <FormAutocompleteRemote
          useFetch={useSchool}
          formatOptions={formatOptions}
          onChangeOptions={onChangeOptions}
          autocompleteProps={{
            id: 'school',
            classesInput: {
              root: classes.inputRoot,
            },
            onChange: handleSubmit(onSubmit),
            placeholder: 'Název školy / REDIZO',
            classNameTextField: classes.autocompleteTextField,
            disableUnderline: true,
          }}
        />
      </Form>
    </div>
  )
}
