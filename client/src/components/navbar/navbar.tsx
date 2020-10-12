import { useSchool } from '@/api/fetchers/school/school'
import { schoolSet } from '@/store/modules/school/school'
import { useAppDispatch } from '@/store/store'
import { useForm } from 'react-hook-form'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import React, { useCallback, useMemo, useState } from 'react'
import { useStyles } from './navbar-styles'
import { FormAutocomplete, Option } from '../form/form-autocomplete'

type FormData = {
  school: Option | null
}

const defaultValues: Partial<FormData> = {
  school: null,
}

export const Navbar = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()
  const { data, isValidating } = useSchool(name)
  const { handleSubmit, control } = useForm<FormData>({ defaultValues })

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
      dispatch(schoolSet(school))
      // TODO: Change URL to school/id
    },
    [data, dispatch]
  )
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Cermat
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormAutocomplete
                id="school"
                options={options}
                control={control}
                classesInput={{
                  root: classes.inputRoot,
                }}
                onChange={handleSubmit(onSubmit)}
                onInputChange={onInputChange}
                isLoading={isValidating}
                placeholder="Hledej název školy / REDIZO"
                classNameTextField={classes.autocompleteTextField}
                disableUnderline
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
