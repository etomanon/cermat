import { useSchoolResults } from '@/api/fetchers/school/school'
import { Loading } from '@/components/loading/loading'
import { schoolSet } from '@/store/modules/school/school'
import { schoolResultsToSchool } from '@/store/modules/school/school-utils'
import { useAppDispatch } from '@/store/store'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SchoolInfo } from './school-info'

export const School = () => {
  const dispatch = useAppDispatch()
  const { redizo } = useParams<{ redizo: string }>()
  const { data, isValidating, error } = useSchoolResults(redizo)

  useEffect(() => {
    if (data) {
      const parsed = schoolResultsToSchool(data)
      dispatch(schoolSet(parsed))
    }
  }, [data, dispatch])

  return (
    <>
      <Loading error={error} isValidating={isValidating} />
      {data && <SchoolInfo schoolResults={data} year="2019" />}
    </>
  )
}
