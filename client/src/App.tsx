import { hot } from 'react-hot-loader/root'
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme/theme'
import { Router } from './router/router'
import { SwrConfig } from './api/swr-config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  return (
    <>
      <SwrConfig>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer position="bottom-right" />
          <Router />
        </ThemeProvider>
      </SwrConfig>
    </>
  )
}

export default hot(App)
