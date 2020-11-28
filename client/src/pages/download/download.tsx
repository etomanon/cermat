import { ControlLink } from '@/components/control/control-link'
import { LayoutWrapper } from '@/components/layout/layout-wrapper'
import { DEVELOPMENT_SERVER } from '@/router/routes'
import { Box, Fade, Typography } from '@material-ui/core'
import React from 'react'

const DOWNLOAD_URL = 'api/result/download'

export const Download = () => {
  return (
    <>
      <Fade in>
        <LayoutWrapper>
          <Box mt="2rem" overflow="hidden">
            <ControlLink
              href={`${
                process.env.NODE_ENV === 'development'
                  ? `${DEVELOPMENT_SERVER}/${DOWNLOAD_URL}`
                  : `${window.location.origin}/${DOWNLOAD_URL}`
              }`}
            >
              <Typography variant="h2" align="center">
                Data ve formátu csv ke stažení zde
              </Typography>
            </ControlLink>
          </Box>
        </LayoutWrapper>
      </Fade>
    </>
  )
}
