import { GraphLine, GraphLineLine } from '@/components/graph/graph-line'
import { SchoolResults } from '@/store/modules/school/school-types'
import {
  parseSchoolSubject,
  parseSchoolSubjectColor,
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
        return {
          ...acc,
          [parseSchoolSubject(cur.subject)]: cur.shareChosen,
        }
      }, {}),
    }))
    return {
      percentil,
      chosen,
    }
  }, [schoolResults.results])

  const lines = useMemo<GraphLineLine[]>(() => {
    const subjects = groupBy(schoolResults.results, 'subject')
    const lines = Object.keys(subjects).map((s) => ({
      dataKey: parseSchoolSubject(s),
      color: parseSchoolSubjectColor(s),
    }))
    return lines
  }, [schoolResults.results])

  return (
    <>
      <Box width={1} height="40rem" mt="2rem">
        <Typography variant="h4" align="center" gutterBottom>
          Průměr percentilového umístění v předmětech během let
        </Typography>
        <GraphLine data={data.percentil} lines={lines} />
      </Box>
      <Box width={1} height="40rem" mt="6rem">
        <Typography variant="h4" align="center" gutterBottom>
          Podíl volby předmětů během let (%)
        </Typography>
        <GraphLine data={data.chosen} lines={lines} />
      </Box>
    </>
  )
}
