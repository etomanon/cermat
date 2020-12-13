import { ObjectAny } from '@/utils/types/object-any'
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
  className?: string
}

export const FormAutocompleteRemote = <T extends ObjectAny>({
  formatOptions,
  autocompleteProps,
  useFetch,
  onChangeOptions,
  className,
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
      className,
    }),
    [autocompleteProps, isValidating, onInputChange, options, className]
  )
  return <FormAutocomplete {...autocompletePropsOptions} />
}
