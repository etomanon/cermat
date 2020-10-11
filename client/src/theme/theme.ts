import { createMuiTheme } from '@material-ui/core'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

export const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: 10,
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
})
