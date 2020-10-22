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
  [EnumSubject.CJ_DT, EnumSubject.CJ_UZ, EnumSubject.AJ_DT].indexOf(subject) ===
  -1
