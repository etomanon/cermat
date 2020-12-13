import { Theme } from '@material-ui/core'
import { CSSProp } from 'styled-components'

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>
  }
}
