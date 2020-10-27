import { isNil, isNumber, round, sum } from 'lodash'
import { EnumSubject, ResultsEntity } from './school-types'
import { SchoolResults, School } from './school-types'

export const getSchoolUrl = (redizo: string) =>
  `https://portal.csicr.cz/School/${redizo}`

export const schoolResultsToSchool = (
  schoolResults: SchoolResults
): School => ({
  id: schoolResults.id,
  name: schoolResults.name,
  redizo: schoolResults.redizo,
  region: schoolResults.region,
  geom: schoolResults.geom,
  createdAt: schoolResults.createdAt,
  updatedAt: schoolResults.updatedAt,
})

const subjectMap = {
  [EnumSubject.MEAN]: {
    name: 'Průměr všech předmětů',
    simple: 'Průměr všech předmětů',
    color: '#4f4f4f',
  },
  [EnumSubject.MA]: {
    name: 'Matematika',
    simple: 'Matematika',
    color: '#f74323',
  },
  [EnumSubject.CJ_DT]: {
    name: 'Český jazyk - didaktický test',
    simple: 'Čeština',
    color: '#5203ff',
  },

  [EnumSubject.CJ_UZ]: {
    name: 'Český jazyk - ústní zkouška',
    simple: 'Čeština',
    color: '#03c8ff',
  },

  [EnumSubject.AJ_DT]: {
    name: 'Anglický jazyk - didaktický test',
    simple: 'Angličtina',
    color: '#fa9a0a',
  },
  [EnumSubject.AJ_UZ]: {
    name: 'Anglický jazyk - ústní zkouška',
    simple: 'Angličtina',
    color: '#e3d109',
  },
} as {
  [subject in EnumSubject]: {
    name: string
    simple: string
    color: string
  }
}

export const parseSchoolSubject = (subject: EnumSubject, simple?: boolean) =>
  simple ? subjectMap[subject].simple : subjectMap[subject].name
export const parseSchoolSubjectColor = (subject: EnumSubject) =>
  subjectMap[subject].color
export const showSubjectShare = (subject: EnumSubject) =>
  [
    EnumSubject.CJ_DT,
    EnumSubject.CJ_UZ,
    EnumSubject.AJ_DT,
    EnumSubject.MEAN,
  ].indexOf(subject) === -1

export const parseSchoolCompareColor = (type: 'A' | 'B') =>
  type === 'A' ? '#18068f' : '#b50713'

const getSumForNumbers = (
  acc: ResultsEntity | null,
  entity: ResultsEntity
): ResultsEntity => {
  const keys = Object.keys(entity) as (keyof ResultsEntity)[]
  const mapped = keys.reduce(
    (a, key) => ({
      ...a,
      subject: EnumSubject.MEAN,
      [key]: isNumber(entity[key])
        ? isNil(acc?.[key])
          ? entity[key]
          : sum([entity[key], acc?.[key]])
        : entity[key],
    }),
    {} as ResultsEntity
  )

  return mapped
}

/**
 * Get mean values for each ResultsEntity number property
 * @param results school results
 */
export const getResultsMean = (results: ResultsEntity[]): ResultsEntity =>
  (Object.entries(
    results.reduce(
      (acc, cur) => getSumForNumbers(acc, cur),
      {} as ResultsEntity
    )
  ).map(([key, value]) => ({
    [key]: isNumber(value)
      ? round(
          value /
            results.filter((r) => !isNil(r[key as keyof ResultsEntity])).length,
          1
        )
      : value,
  })) as ResultsEntity[]).reduce((acc, cur) => ({ ...acc, ...cur }))
