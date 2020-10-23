import { useSchoolResults } from '@/api/fetchers/school/school'
import { Loading } from '@/components/loading/loading'
import { schoolCompareSet, schoolSet } from '@/store/modules/school/school'
import { schoolResultsToSchool } from '@/store/modules/school/school-utils'
import { useAppDispatch } from '@/store/store'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SchoolInfo } from './school-info'

export type SchoolParams = {
  redizo: string
  redizoCompare?: string
}

export const School = () => {
  const dispatch = useAppDispatch()
  const { redizo, redizoCompare } = useParams<SchoolParams>()
  const { data, isValidating, error } = useSchoolResults(redizo)
  const {
    data: dataCompare,
    isValidating: isValidatingCompare,
    error: errorCompare,
  } = useSchoolResults(redizoCompare)

  useEffect(() => {
    let parsed = undefined
    if (data) {
      parsed = schoolResultsToSchool(data)
    }
    dispatch(schoolSet(parsed))
  }, [data, dispatch])

  useEffect(() => {
    let parsed
    if (dataCompare) {
      parsed = schoolResultsToSchool(dataCompare)
    }
    dispatch(schoolCompareSet(parsed))
  }, [dataCompare, dispatch])

  return (
    <>
      <Loading
        error={error || errorCompare}
        isValidating={isValidating || isValidatingCompare}
      />
      <SchoolInfo schoolResults={data} schoolResultsCompare={dataCompare} />
    </>
  )
}
