import { Option } from '@/components/form/form-autocomplete'
import { GraphPie } from '@/components/graph/graph-pie'
import { SchoolResults } from '@/store/modules/school/school-types'
import { parseSchoolSubject } from '@/store/modules/school/school-utils'
import { theme } from '@/theme/theme'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import { compact, groupBy } from 'lodash'
import React, { useMemo } from 'react'

type Props = {
  year: number
  subjects: Option<string>[]
  schoolResultsA?: SchoolResults
  schoolResultsB?: SchoolResults
}

export const CompareSubjects = ({
  schoolResultsA,
  schoolResultsB,
  year,
  subjects,
}: Props) => {
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'))

  const results = useMemo(() => {
    const groupedYearA = groupBy(schoolResultsA?.results, 'year')
    const yearResultsA = groupedYearA[year] ?? []
    const groupedYearB = groupBy(schoolResultsB?.results, 'year')
    const yearResultsB = groupedYearB[year] ?? []
    const data = yearResultsA
      .filter((a) => subjects.some((s) => s.value === a.subject))
      .map((a) => {
        const b = yearResultsB.find((b) => b.subject === a.subject)
        if (!b) {
          return null
        }
        return {
          subject: a.subject,
          A: a,
          B: b,
        }
      })
    return compact(data)
  }, [schoolResultsA, schoolResultsB, year, subjects])

  return (
    <>
      <Box width={1} pt="3rem" />
      {results?.map((r) => (
        <React.Fragment key={r.subject}>
          <Box
            display="flex"
            justifyContent="center"
            width={1}
            alignItems="center"
            flexWrap="wrap"
          >
            <Box mr={[0, 0, '3rem']} textAlign="center" width={[1, 1, 'auto']}>
              <Typography variant="h4">
                {parseSchoolSubject(r.subject)}
              </Typography>
              <Typography variant="h4">{year}</Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            mt={['1rem', '1rem', '2rem']}
            flexDirection={['column', 'column', 'row']}
            alignItems={['center', 'center', 'flex-start']}
            width={[1, 1, '60rem']}
            mx="auto"
          >
            <Box width={[1, 1, 0.5]}>
              <GraphPie
                label="A"
                color={{
                  Úspěšní: theme.palette.success.main,
                  Neúspěšní: theme.palette.error.main,
                }}
                data={[
                  {
                    name: 'Úspěšní',
                    value: r.A.success,
                  },
                  {
                    name: 'Neúspěšní',
                    value: r.A.failed,
                  },
                ]}
              />
            </Box>
            <Box width={[1, 1, 0.5]}>
              <GraphPie
                label="B"
                color={{
                  Úspěšní: theme.palette.success.main,
                  Neúspěšní: theme.palette.error.main,
                }}
                data={[
                  {
                    name: 'Úspěšní',
                    value: r.B.success,
                  },
                  {
                    name: 'Neúspěšní',
                    value: r.B.failed,
                  },
                ]}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            mt={['1rem', '1rem', '2rem']}
            flexDirection={['column', 'column', 'row']}
            alignItems={['center', 'center', 'flex-start']}
            width={[1, 1, '60rem']}
            mx="auto"
          >
            <Box width={[1, 1, 0.5]}>
              <GraphPie
                label={matchesMd ? undefined : 'A'}
                color={{
                  Testovaní: theme.palette.success.main,
                  Omluvení: theme.palette.warning.main,
                  Vyloučení: theme.palette.error.main,
                }}
                data={[
                  {
                    name: 'Testovaní',
                    value: r.A.tested,
                  },
                  {
                    name: 'Omluvení',
                    value: r.A.excused,
                  },
                  {
                    name: 'Vyloučení',
                    value: r.A.expelled,
                  },
                ]}
              />
            </Box>
            <Box width={[1, 1, 0.5]}>
              <GraphPie
                label={matchesMd ? undefined : 'B'}
                color={{
                  Testovaní: theme.palette.success.main,
                  Omluvení: theme.palette.warning.main,
                  Vyloučení: theme.palette.error.main,
                }}
                data={[
                  {
                    name: 'Testovaní',
                    value: r.B.tested,
                  },
                  {
                    name: 'Omluvení',
                    value: r.B.excused,
                  },
                  {
                    name: 'Vyloučení',
                    value: r.B.expelled,
                  },
                ]}
              />
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </>
  )
}
