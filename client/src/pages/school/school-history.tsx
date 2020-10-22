import { GraphLine, GraphLineLine } from '@/components/graph/graph-line'
import { EnumSubject, SchoolResults } from '@/store/modules/school/school-types'
import {
  parseSchoolSubject,
  parseSchoolSubjectColor,
  showSubjectShare,
} from '@/store/modules/school/school-utils'
import { Box, Typography } from '@material-ui/core'
import { groupBy } from 'lodash'
import React, { useMemo } from 'react'

type Props = {
  schoolResults: SchoolResults
}

export const SchoolHistory = ({ schoolResults }: Props) => {
  const data = useMemo(() => {
    const yearsDict = groupBy(schoolResults.results, 'year')
    const years = Object.keys(yearsDict)
    const percentil = years.map((year) => ({
      name: year,
      // add each subject for this year with successPercentil as value
      ...yearsDict[year].reduce((acc, cur) => {
        return {
          ...acc,
          [parseSchoolSubject(cur.subject)]: cur.successPercentil,
        }
      }, {}),
    }))
    const chosen = years.map((year) => ({
      name: year,
      // add each subject for this year with successPercentil as value
      ...yearsDict[year].reduce((acc, cur) => {
        return showSubjectShare(cur.subject)
          ? {
              ...acc,
              [parseSchoolSubject(cur.subject, true)]: cur.shareChosen,
            }
          : acc
      }, {}),
    }))
    return {
      percentil,
      chosen,
    }
  }, [schoolResults.results])

  const lines = useMemo<{
    share: GraphLineLine[]
    percentil: GraphLineLine[]
  }>(() => {
    const subjects = groupBy(schoolResults.results, 'subject')
    const keys = Object.keys(subjects)
    const parseSubject = (s: string, simple?: boolean) => ({
      dataKey: parseSchoolSubject(s as EnumSubject, simple),
      color: parseSchoolSubjectColor(s as EnumSubject),
    })
    const percentil = keys.map((s) => parseSubject(s))
    const share = keys
      .filter((s) => showSubjectShare(s as EnumSubject))
      .map((s) => parseSubject(s, true))

    return { percentil, share }
  }, [schoolResults.results])

  return (
    <>
      <Box mt="2rem" mb="1rem">
        <Typography variant="h4" align="center">
          Průměr percentilového umístění v předmětech během let
        </Typography>
      </Box>

      <Box width={1} height="40rem">
        <GraphLine data={data.percentil} lines={lines.percentil} />
      </Box>
      <Box mt="2rem" mb="1rem">
        <Typography variant="h4" align="center">
          Podíl volby předmětů během let (%)
        </Typography>
      </Box>
      <Box width={1} height="40rem">
        <GraphLine data={data.chosen} lines={lines.share} />
      </Box>
    </>
  )
}
