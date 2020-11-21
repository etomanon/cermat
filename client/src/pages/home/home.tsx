import { ControlNavLink } from '@/components/control/control-nav-link'
import { Img } from '@/components/img/Img'
import { Flex } from '@/components/layout/Flex'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { SearchSchool } from '@/components/search/search-school'
import { EnumRoutePath } from '@/router/routes'
import { Box, Button, Fade, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './home-styles'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import SchoolSvg from './school.svg'
import TableSvg from './table-primary.svg'

export const Home = () => {
  const classes = useStyles()
  return (
    <>
      <Fade in>
        <LayoutWrapper overflow="hidden" mt="2rem">
          <Flex mx="-2rem" overflow="hidden">
            <Box
              width={[1, 1, 0.6]}
              px="2rem"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              textAlign={['center', 'center', 'left']}
              mb={['1rem', '1rem', 0]}
            >
              <Typography variant="h1" gutterBottom>
                Zjistěte maturitní výsledky škol
              </Typography>
              <SearchSchool />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width={[0, 0, 0.4]}
              px="2rem"
            >
              <Img width={[1, 0.66, 1]} src={SchoolSvg} alt="school" />
            </Box>

            <Box
              position="relative"
              mt={['2rem', '2rem', '2rem', '8rem']}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              width={1}
              px="2rem"
            >
              <ControlNavLink to={EnumRoutePath.RESULTS} underline="none">
                <Box className={classes.buttonTableWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon fontSize="large" />}
                    size="large"
                    className={classes.buttonTable}
                  >
                    Procházejte data v tabulce
                  </Button>
                </Box>
              </ControlNavLink>
              <Img width={[1, 0.66, 0.5]} src={TableSvg} alt="table" />
            </Box>
          </Flex>
        </LayoutWrapper>
      </Fade>
    </>
  )
}
