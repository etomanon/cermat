import { useApi } from '@/api/swr'
import { Flex } from '@/components/layout/Flex'
import { EnumSubject } from '@/store/modules/school/school-types'
import { Box, CircularProgress, Fade, Typography } from '@material-ui/core'
import React from 'react'
import { Result } from '../results/types'
import { RadiusItem } from './radius-item'

export type RadiusApiType = {
  subject: EnumSubject
  year: number
  geom: GeoJSON.Point
  radius: number
}

type RadiusApiResponse = {
  results: Result[]
}

type Props = {
  radiusApi: RadiusApiType
}

export const RadiusApi = ({ radiusApi }: Props) => {
  const { isValidating, data, error } = useApi<RadiusApiResponse>({
    url: 'result/radius',
    init: {
      method: 'POST',
      body: JSON.stringify(radiusApi),
    },
  })

  if (isValidating) {
    return (
      <Flex mt="2rem" justifyContent="center">
        <CircularProgress size="3rem" />
      </Flex>
    )
  }

  return (
    <>
      {!isValidating && !error && data?.results?.length == 0 && (
        <Box mt="2rem">
          <Typography variant="h3" align="center">
            Nic nenalezeno
          </Typography>
        </Box>
      )}
      <Fade in>
        <Flex mx="-1rem" mt={['2rem', '2rem', '4rem']}>
          {data?.results?.map?.((d, i) => (
            <Flex key={d.id} width={[1, 0.5, 0.25]} px="1rem" mb="2rem">
              <RadiusItem
                result={d}
                index={i}
                resultsTotal={data.results.length}
              />
            </Flex>
          ))}
        </Flex>
      </Fade>
    </>
  )
}
