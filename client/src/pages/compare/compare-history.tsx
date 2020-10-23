import { Option } from '@/components/form/form-autocomplete'
import { GraphLine, GraphLineLine } from '@/components/graph/graph-line'
import { EnumSubject, SchoolResults } from '@/store/modules/school/school-types'
import {
  parseSchoolCompareColor,
  parseSchoolSubject,
  showSubjectShare,
} from '@/store/modules/school/school-utils'
import { Box, Typography } from '@material-ui/core'
import { groupBy } from 'lodash'
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
    const subjectsDict = groupBy(schoolResultsB?.results, 'subject')
    const years = Object.keys(yearsDict)
    const percentil = subjects
      .filter((cur) => subjects.some((s) => s.value === cur.value))
      .map((subject) => ({
        subject: subject.value,
        values: years.map((year) => ({
          name: year,
          ...yearsDict[year].reduce(
            (acc, cur) => ({
              ...acc,
              [`${parseSchoolSubject(cur.subject)} (A)`]: cur.successPercentil,
              [`${parseSchoolSubject(cur.subject)} (B)`]: yearsDictB[
                year
              ]?.find((r) => r.subject === subject.value)?.successPercentil,
            }),
            {}
          ),
        })),
      }))
    const share = Object.keys(subjectsDict)
      .filter((s) => showSubjectShare(s as EnumSubject))
      .map((subject) => ({
        subject: subject,
        values: years.map((year) => ({
          name: year,
          ...yearsDict[year].reduce(
            (acc, cur) =>
              cur.subject === subject
                ? {
                    ...acc,
                    [`${parseSchoolSubject(
                      cur.subject,
                      true
                    )} (A)`]: cur.shareChosen,
                    [`${parseSchoolSubject(
                      cur.subject,
                      true
                    )} (B)`]: yearsDictB[year].find(
                      (r) => r.subject === subject
                    )?.shareChosen,
                  }
                : acc,
            {}
          ),
        })),
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
    const resultSubjects = groupBy(schoolResultsA?.results, 'subject')
    const keys = Object.keys(resultSubjects)
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
  }, [schoolResultsA, subjects])

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
