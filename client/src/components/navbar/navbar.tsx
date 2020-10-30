import { useSchool } from '@/api/fetchers/school/school'
import { schoolSet } from '@/store/modules/school/school'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useForm } from 'react-hook-form'
import { AppBar, Toolbar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React, { useCallback, useMemo, useState } from 'react'
import { useStyles } from './navbar-styles'
import { FormAutocomplete, Option } from '../form/form-autocomplete'
import { useHistory } from 'react-router-dom'
import { EnumRoutePath } from '@/router/routes'
import { Form } from '../form/form'
import { LayoutWrapper } from '../layout/layout-wrapper'
import { NavbarPanel } from './navbar-panel'

type FormData = {
  school: Option<number> | null
}

const defaultValues: Partial<FormData> = {
  school: null,
}

export const Navbar = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const schoolCompare = useAppSelector(
    (state) => state.school.schoolSelectedCompare
  )
  const { data, isValidating } = useSchool(name)
  const { push } = useHistory()
  const methods = useForm<FormData>({ defaultValues })
  const { handleSubmit } = methods

  const options = useMemo(
    () =>
      data?.map?.((d) => ({ value: d.id, label: `${d.name} (${d.redizo})` })) ??
      [],
    [data]
  )
  const onInputChange = useCallback((value: string) => setName(value), [])
  const onSubmit = useCallback(
    (formData: FormData) => {
      const school = data?.find?.((d) => d.id === formData.school?.value)
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
    [data, dispatch, push, schoolCompare]
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
                <FormAutocomplete
                  id="school"
                  options={options}
                  classesInput={{
                    root: classes.inputRoot,
                  }}
                  onChange={handleSubmit(onSubmit)}
                  onInputChange={onInputChange}
                  isLoading={isValidating}
                  placeholder="Název školy / REDIZO"
                  classNameTextField={classes.autocompleteTextField}
                  disableUnderline
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
