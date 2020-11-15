import { useSchool } from '@/api/fetchers/school/school'
import { schoolSet } from '@/store/modules/school/school'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useForm } from 'react-hook-form'
import { AppBar, Toolbar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React, { useCallback, useState } from 'react'
import { useStyles } from './navbar-styles'
import { Option } from '../form/form-autocomplete'
import { useHistory } from 'react-router-dom'
import { EnumRoutePath } from '@/router/routes'
import { Form } from '../form/form'
import { LayoutWrapper } from '../layout/layout-wrapper'
import { NavbarPanel } from './navbar-panel'
import { FormAutocompleteRemote } from '../form/form-autocomplete-remote'
import { School } from '@/store/modules/school/school-types'

type FormData = {
  school: Option<number> | null
}

const defaultValues: Partial<FormData> = {
  school: null,
}

export const Navbar = () => {
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
    <>
      <AppBar position="fixed">
        <LayoutWrapper>
          <Toolbar disableGutters>
            <NavbarPanel />
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
          </Toolbar>
        </LayoutWrapper>
      </AppBar>
      <Toolbar />
    </>
  )
}
