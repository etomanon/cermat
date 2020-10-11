import { hot } from 'react-hot-loader/root'
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme/theme'
import { Router } from './router/router'
import { SwrConfig } from './api/swr-config'

const App: React.FC = () => {
  return (
    <>
      <SwrConfig>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </SwrConfig>
    </>
  )
}

export default hot(App)
