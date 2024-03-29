import { hot } from 'react-hot-loader/root'
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { ThemeProvider as ThemeProviderStyled } from 'styled-components'
import { ThemeProvider, StylesProvider } from '@material-ui/core'
import { theme } from './theme/theme'
import { GlobalStyle } from './theme/global-style'
import { Router } from './router/router'
import { SwrConfig } from './api/swr-config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  return (
    <>
      <SwrConfig>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <ThemeProviderStyled theme={theme}>
              <CssBaseline />
              <GlobalStyle />
              <ToastContainer position="bottom-right" limit={2} />
              <Router />
            </ThemeProviderStyled>
          </ThemeProvider>
        </StylesProvider>
      </SwrConfig>
    </>
  )
}

export default hot(App)
