import { useApi } from '@/api/swr'
import { ControlNavLink } from '@/components/control/control-nav-link'
import { Flex } from '@/components/layout/Flex'
import { EnumRoutePath } from '@/router/routes'
import { EnumSubject } from '@/store/modules/school/school-types'
import {
  Box,
  CircularProgress,
  Fade,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { Result } from '../results/types'

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
          {data?.results?.map?.((d) => (
            <Flex key={d.id} width={[1, 0.5, 0.25]} px="1rem" mb="2rem">
              <ItemWrapper>
                <ControlNavLink
                  to={`${EnumRoutePath.SCHOOL}/${d.school.redizo}`}
                >
                  <Flex mb="0.5rem" color="primary">
                    {d.school.name}
                  </Flex>
                </ControlNavLink>
                <Flex mt="auto">
                  Percentil úspěšnosti:
                  <Flex ml="auto"> {d.successPercentil}</Flex>
                </Flex>
              </ItemWrapper>
            </Flex>
          ))}
        </Flex>
      </Fade>
    </>
  )
}

const ItemWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 2rem;
`
