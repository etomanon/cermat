import { Flex } from '@/components/layout/Flex'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { Box, Fade, Typography } from '@material-ui/core'
import React from 'react'
import { AboutItem } from './about-item'
import { ABOUT_ITEMS } from './utils'

export const About = () => {
  return (
    <>
      <Fade in>
        <LayoutWrapper>
          <Box mt="2rem" overflow="hidden">
            <Typography variant="h1" align="center">
              O projektu
            </Typography>
            <Flex mx="-2rem" mt={['2rem', '2rem', '4rem']}>
              {ABOUT_ITEMS.map((a) => (
                <Flex key={a.title} px="2rem" width={[1, 1, 1 / 3]} mb="2rem">
                  <AboutItem aboutItem={a} />
                </Flex>
              ))}
            </Flex>
          </Box>
        </LayoutWrapper>
      </Fade>
    </>
  )
}
