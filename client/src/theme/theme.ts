import { createMuiTheme } from '@material-ui/core'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

const colorPrimary = purple[500]

const themeBreakpoints = createMuiTheme()

export const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: colorPrimary,
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
    MuiTypography: {
      h1: {
        fontSize: '4rem',
        width: '100%',
        [themeBreakpoints.breakpoints.up('sm')]: {
          fontSize: '6rem',
        },
        [themeBreakpoints.breakpoints.up('md')]: {
          fontSize: '8.6rem',
        },
      },
      h2: {
        fontSize: '2.4rem',
        letterSpacing: 0,
      },
      h3: {
        fontSize: '2rem',
      },
      h4: {
        fontSize: '2rem',
        letterSpacing: 1,
        color: colorPrimary,
      },
      h5: {
        fontSize: '2rem',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1.3rem',
      },
    },
  },
})
