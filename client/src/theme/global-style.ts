import { createGlobalStyle, css } from 'styled-components'
import { Theme } from '@material-ui/core'

export const GlobalStyle = createGlobalStyle`
${(props) => {
  const theme = props.theme as Theme
  const { light, main } = theme.palette.primary
  const { getContrastText } = theme.palette
  /* eslint-disable prettier/prettier  */
  return css`
    .MuiAutocomplete-option[aria-selected="true"] {
      background-color: ${main};
      color: ${getContrastText(main)};
    }
    && .MuiAutocomplete-option[data-focus="true"] {
      background-color: ${light};
      color: ${getContrastText(light)};
    }
  `
}}
`
