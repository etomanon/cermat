import { ApiArgs, useApi } from '@/api/swr'
import { School, SchoolResults } from '@/store/modules/school/school-types'
import { useDebounce } from '@/utils/hooks/useDebounce'
import { useMemo } from 'react'

export const useSchool = (name: string) => {
  const nameDebounced = useDebounce(name, 300)
  const params = useMemo<ApiArgs>(
    () =>
      nameDebounced
        ? {
            key: `school/name/${nameDebounced}`,
            url: 'school/name',
            init: {
              method: 'POST',
              body: JSON.stringify({
                name: nameDebounced,
              }),
            },
          }
        : null,

    [nameDebounced]
  )
  const { data, error, isValidating } = useApi<School[]>(params)

  return {
    data,
    error,
    isValidating,
  }
}

/**
 * Get all results for 1 school
 * @param redizo
 */
export const useSchoolResults = (redizo?: string) => {
  const params = useMemo<ApiArgs>(
    () =>
      redizo
        ? {
            key: `school/results/${redizo}`,
            url: 'school/results',
            init: {
              method: 'POST',
              body: JSON.stringify({
                redizo,
              }),
            },
          }
        : null,

    [redizo]
  )
  const { data, error, isValidating } = useApi<SchoolResults>(params)

  return {
    data,
    error,
    isValidating,
  }
}
