import { Option } from '@/components/form/form-autocomplete'
import { GraphLine, GraphLineLine } from '@/components/graph/graph-line'
import { EnumSubject, SchoolResults } from '@/store/modules/school/school-types'
import {
  parseSchoolCompareColor,
  parseSchoolSubject,
  showSubjectShare,
} from '@/store/modules/school/school-utils'
import { Box, Typography } from '@material-ui/core'
import { groupBy, meanBy, round, uniq } from 'lodash'
import React, { useMemo } from 'react'

type Props = {
  schoolResultsA?: SchoolResults
  schoolResultsB?: SchoolResults
  subjects: Option<string>[]
}

export const CompareHistory = ({
  schoolResultsA,
  schoolResultsB,
  subjects,
}: Props) => {
  const data = useMemo(() => {
    const yearsDict = groupBy(schoolResultsA?.results, 'year')
    const yearsDictB = groupBy(schoolResultsB?.results, 'year')
    const yearsAll = uniq([
      ...Object.keys(yearsDict),
      ...Object.keys(yearsDictB),
    ])
    const resultSubjects = Object.keys(
      groupBy(schoolResultsA?.results, 'subject')
    )
    const resultSubjectsB = Object.keys(
      groupBy(schoolResultsB?.results, 'subject')
    )
    const unique = uniq([...resultSubjects, ...resultSubjectsB])

    const subjectsFiltered = subjects.filter(
      (cur) =>
        subjects.some((s) => s.value === cur.value) &&
        cur.value !== EnumSubject.MEAN
    )
    const mean = subjects.some((s) => s.value === EnumSubject.MEAN)
      ? [
          {
            subject: EnumSubject.MEAN as string,
            values: yearsAll.map((year) => {
              const valueA = round(
                meanBy(yearsDict[year], (el) => el.successPercentil),
                1
              ) as number | undefined
              const valueB = round(
                meanBy(yearsDictB[year], (el) => el.successPercentil),
                1
              )
              return {
                name: year,
                [`${parseSchoolSubject(EnumSubject.MEAN)} (A)`]: valueA,
                [`${parseSchoolSubject(EnumSubject.MEAN)} (B)`]: valueB,
              }
            }),
          },
        ]
      : []

    const percentil = mean.concat(
      ...subjectsFiltered.map((subject) => ({
        subject: subject.value,
        values: yearsAll.map((year) => {
          const valueA = yearsDict[year]?.find(
            (r) => r.subject === subject.value
          )?.successPercentil
          const valueB = yearsDictB[year]?.find(
            (r) => r.subject === subject.value
          )?.successPercentil
          return {
            name: year,
            [`${parseSchoolSubject(subject.value as EnumSubject)} (A)`]: valueA,
            [`${parseSchoolSubject(subject.value as EnumSubject)} (B)`]: valueB,
          }
        }),
      }))
    )

    const share = unique
      .filter((s) => showSubjectShare(s as EnumSubject))
      .map((subject) => ({
        subject: subject,
        values: yearsAll.map((year) => {
          const valueA = yearsDict[year]?.find((r) => r.subject === subject)
            ?.shareChosen
          const valueB = yearsDictB[year]?.find((r) => r.subject === subject)
            ?.shareChosen
          return {
            name: year,
            [`${parseSchoolSubject(subject as EnumSubject, true)} (A)`]: valueA,
            [`${parseSchoolSubject(subject as EnumSubject, true)} (B)`]: valueB,
          }
        }),
      }))
    return {
      percentil,
      share,
    }
  }, [schoolResultsA, schoolResultsB, subjects])

  const lines = useMemo<{
    share: {
      name: string
      lines: GraphLineLine[]
    }[]
    percentil: {
      name: string
      lines: GraphLineLine[]
    }[]
  }>(() => {
    const resultSubjects = Object.keys(
      groupBy(schoolResultsA?.results, 'subject')
    )
    const resultSubjectsB = Object.keys(
      groupBy(schoolResultsB?.results, 'subject')
    )
    const unique = uniq([...resultSubjects, ...resultSubjectsB])

    const keys = unique.concat(EnumSubject.MEAN)
    const percentil = keys
      .filter((key) => subjects.some((s) => s.value === key))
      .map((s) => ({
        name: s,
        lines: [
          {
            dataKey: `${parseSchoolSubject(s as EnumSubject)} (A)`,
            color: parseSchoolCompareColor('A'),
          },
          {
            dataKey: `${parseSchoolSubject(s as EnumSubject)} (B)`,
            color: parseSchoolCompareColor('B'),
          },
        ],
      }))
    const share = keys
      .filter((s) => showSubjectShare(s as EnumSubject))
      .map((s) => ({
        name: s,
        lines: [
          {
            dataKey: `${parseSchoolSubject(s as EnumSubject, true)} (A)`,
            color: parseSchoolCompareColor('A'),
          },
          {
            dataKey: `${parseSchoolSubject(s as EnumSubject, true)} (B)`,
            color: parseSchoolCompareColor('B'),
          },
        ],
      }))

    return { percentil, share }
  }, [schoolResultsA, subjects, schoolResultsB])

  return (
    <>
      {data.percentil.length !== 0 && (
        <Box mt="2.5rem" mb="1rem">
          <Typography variant="h4" align="center">
            Průměr percentilového umístění v předmětech během let
          </Typography>
        </Box>
      )}

      {data.percentil.map((d) => (
        <Box key={d.subject + 'percentil'} width={1} height="40rem" mt=".5rem">
          <GraphLine
            data={d.values}
            lines={
              lines.percentil.find((p) => p.name === d.subject)?.lines ?? []
            }
          />
        </Box>
      ))}

      <Box mt="2rem" mb="1rem">
        <Typography variant="h4" align="center">
          Podíl volby předmětů během let (%)
        </Typography>
      </Box>

      {data.share.map((d) => (
        <Box key={d.subject + 'share'} width={1} height="40rem" mt=".5rem">
          <GraphLine
            data={d.values}
            lines={lines.share.find((p) => p.name === d.subject)?.lines ?? []}
          />
        </Box>
      ))}
    </>
  )
}
