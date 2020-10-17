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
  math: {
    name: 'Matematika',
    color: '#ccaa21',
  },
} as {
  [subject: string]: {
    name: string
    color: string
  }
}

export const parseSchoolSubject = (subject: string) => subjectMap[subject].name
export const parseSchoolSubjectColor = (subject: string) =>
  subjectMap[subject].color
