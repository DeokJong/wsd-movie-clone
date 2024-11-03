import { createTheme } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'

import { SBAggro } from './font'

const addGlobalStyle = (styleString: string) => {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(styleString))
  document.head.appendChild(style)
}

addGlobalStyle(SBAggro)

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    gradients?: {
      background?: string
    }
    TypographyColor?: {
      primary?: string
      secondary?: string
    }
  }
  interface Palette {
    gradients: {
      background: string
    }
    TypographyColor: {
      primary: string
      secondary: string
    }
  }
}

const baseTheme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
  },
  typography: {
    fontFamily: '"SBAggro","Consolas","Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '6rem',
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 225,
    },
  },
})

const whiteTheme = deepmerge(baseTheme, {
  palette: {
    gradients: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    TypographyColor: {
      primary: '#000',
      secondary: '#fff',
    },
  },
})

const darkTheme = deepmerge(baseTheme, {
  palette: {
    gradients: {
      background: 'linear-gradient(45deg, #019474 30%, #0071AC 90%)',
    },
    TypographyColor: {
      primary: '#fff',
      secondary: '#000',
    },
  },
})

export { whiteTheme, darkTheme }
