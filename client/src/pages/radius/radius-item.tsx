import { ControlNavLink } from '@/components/control/control-nav-link'
import { Flex } from '@/components/layout/Flex'
import { EnumRoutePath } from '@/router/routes'
import { Paper } from '@material-ui/core'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { Result } from '../results/types'
import { theme } from '@/theme/theme'

const SCALE = chroma.scale(['#f00', '#0f0']).mode('lch')

type Props = {
  result: Result
  rank: number
}

export const RadiusItem = ({ result, rank }: Props) => {
  const backgroundColor = useMemo(() => {
    return SCALE(result.successPercentil / 100).hex()
  }, [result])

  return (
    <>
      <ItemWrapper>
        <ControlNavLink to={`${EnumRoutePath.SCHOOL}/${result.school.redizo}`}>
          <Flex mb="0.5rem" color="primary">
            {rank}. {result.school.name}
          </Flex>
        </ControlNavLink>
        <Flex mt="auto" alignItems="center">
          Percentil úspěšnosti:
          <Flex ml="auto">
            <ItemRating backgroundColor={backgroundColor}>
              {result.successPercentil}
            </ItemRating>
          </Flex>
        </Flex>
      </ItemWrapper>
    </>
  )
}

const ItemWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 2rem;
`

const ItemRating = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => theme.palette.getContrastText(props.backgroundColor)};
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
`
