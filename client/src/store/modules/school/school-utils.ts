import { EnumSubject } from './school-types'
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
    order: 0,
  },
  [EnumSubject.MA]: {
    name: 'Matematika',
    simple: 'Matematika',
    color: '#f74323',
    order: 1,
  },
  [EnumSubject.AJ_DT]: {
    name: 'Anglický jazyk - didaktický test',
    simple: 'Angličtina',
    color: '#fa9a0a',
    order: 2,
  },
  [EnumSubject.AJ_UZ]: {
    name: 'Anglický jazyk - ústní zkouška',
    simple: 'Angličtina',
    color: '#e3d109',
    order: 3,
  },
  [EnumSubject.CJ_DT]: {
    name: 'Český jazyk - didaktický test',
    simple: 'Čeština',
    color: '#5203ff',
    order: 4,
  },

  [EnumSubject.CJ_UZ]: {
    name: 'Český jazyk - ústní zkouška',
    simple: 'Čeština',
    color: '#03c8ff',
    order: 5,
  },
} as {
  [subject in EnumSubject]: {
    name: string
    simple: string
    color: string
    order: number
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
export const parseSchoolSubjectOrder = (subject: EnumSubject) =>
  subjectMap[subject].order
export const sortSchoolResults = <T extends { subject: EnumSubject }>(
  data: T[]
) =>
  data.sort(
    (a, b) =>
      parseSchoolSubjectOrder(a.subject) - parseSchoolSubjectOrder(b.subject)
  )
