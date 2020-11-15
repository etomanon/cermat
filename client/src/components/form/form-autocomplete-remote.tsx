import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FormAutocomplete, Option } from './form-autocomplete'

type Props<T> = {
  /** hook to get options from server */
  useFetch: (
    searchValue: string
  ) => {
    data: T[] | undefined
    error: any
    isValidating: boolean
  }
  formatOptions: (data: T[]) => Option<string | number>[]
  autocompleteProps: Omit<ComponentProps<typeof FormAutocomplete>, 'options'>
  onChangeOptions?: (options: T[]) => void
}

export const FormAutocompleteRemote = <T extends {}>({
  formatOptions,
  autocompleteProps,
  useFetch,
  onChangeOptions,
}: Props<T>) => {
  const [searchValue, setSearchValue] = useState('')
  const onInputChange = useCallback(
    (value: string) => setSearchValue(value),
    []
  )
  const { data, isValidating } = useFetch(searchValue)

  useEffect(() => {
    onChangeOptions?.(data ?? [])
  }, [data, onChangeOptions])

  const options = useMemo(() => (data ? formatOptions(data) : []), [
    data,
    formatOptions,
  ])

  const autocompletePropsOptions = useMemo<
    ComponentProps<typeof FormAutocomplete>
  >(
    () => ({
      ...autocompleteProps,
      options,
      isLoading: isValidating,
      onInputChange,
    }),
    [autocompleteProps, isValidating, onInputChange, options]
  )
  return <FormAutocomplete {...autocompletePropsOptions} />
}
