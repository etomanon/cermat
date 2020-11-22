import { Flex } from '@/components/layout/Flex'
import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

export type AboutItemType = {
  Icon: React.ReactNode
  title: string
  description: React.ReactNode
}

type Props = {
  aboutItem: AboutItemType
}

export const AboutItem = ({
  aboutItem: { Icon, title, description },
}: Props) => {
  return (
    <Wrapper>
      <Flex
        flexDirection="column"
        alignItems="center"
        p="1.5rem"
        textAlign="center"
      >
        {Icon}
        <Box mt="1rem">
          <Typography variant="h4" color="inherit">
            {title}
          </Typography>
        </Box>
        <Box mt="1rem">{description}</Box>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Paper)`
  width: 100%;
`
