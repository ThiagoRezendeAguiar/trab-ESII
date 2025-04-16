import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

// theme.js
const colors = {
    primary: "#ffbe0b",
    secondary: "#fb5607",
    accent: "#ff006e",
  }

const theme = extendTheme({ breakpoints, colors })

export default theme