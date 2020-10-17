import { GraphPie } from '@/components/graph/graph-pie'
import { SchoolResults } from '@/store/modules/school/school-types'
import { parseSchoolSubject } from '@/store/modules/school/school-utils'
import { theme } from '@/theme/theme'
import { Box, Typography } from '@material-ui/core'
import { groupBy, isNil, round } from 'lodash'
import React, { useMemo } from 'react'

type Props = {
  schoolResults: SchoolResults
  year: number
}

export const SchoolSubjects = ({ schoolResults, year }: Props) => {
  const results = useMemo(() => {
    const groupedYear = groupBy(schoolResults.results, 'year')
    const yearResults = groupedYear[year]
    return yearResults
  }, [schoolResults, year])

  return (
    <>
      <Box width={1} pt="3rem" />
      {results?.length === 0 ||
        (isNil(results) && (
          <Typography align="center" variant="h4">
            Žádné výsledky
          </Typography>
        ))}
      {results?.map((r) => (
        <React.Fragment key={r.id}>
          <Box
            display="flex"
            justifyContent="center"
            width={1}
            alignItems="center"
            flexWrap="wrap"
          >
            <Box
              mr={[0, 0, '3rem']}
              textAlign="center"
              width={[1, 1, 'auto']}
              mb={['2rem', '2rem', 0]}
            >
              <Typography variant="h4">
                {parseSchoolSubject(r.subject)}
              </Typography>
              <Typography variant="h4">{year}</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={['center', 'center', 'flex-end']}
            >
              <Box
                display="flex"
                flexDirection={['column', 'column', 'row']}
                alignItems="center"
              >
                <Typography>PODÍL VOLBY PŘEDMĚTU (%)&nbsp;</Typography>
                <Typography variant="h4">{round(r.shareChosen, 1)}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection={['column', 'column', 'row']}
                alignItems="center"
                mt={['1rem', '1rem', 0]}
              >
                <Typography>PRŮMĚR PERCENTILOVÉHO UMÍSTĚNÍ&nbsp;</Typography>
                <Typography variant="h4">
                  {round(r.successPercentil, 1)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            mt="2rem"
            flexDirection={['column', 'column', 'row']}
            alignItems={['center', 'center', 'flex-start']}
          >
            <GraphPie
              color={{
                Úspěšní: theme.palette.success.main,
                Neúspěšní: theme.palette.error.main,
              }}
              data={[
                {
                  name: 'Úspěšní',
                  value: r.success,
                },
                {
                  name: 'Neúspěšní',
                  value: r.failed,
                },
              ]}
            />
            <GraphPie
              color={{
                Testovaní: theme.palette.success.main,
                Omluvení: theme.palette.warning.main,
                Vyloučení: theme.palette.error.main,
              }}
              data={[
                {
                  name: 'Testovaní',
                  value: r.tested,
                },
                {
                  name: 'Omluvení',
                  value: r.excused,
                },
                {
                  name: 'Vyloučení',
                  value: r.expelled,
                },
              ]}
            />
          </Box>
        </React.Fragment>
      ))}
    </>
  )
}
