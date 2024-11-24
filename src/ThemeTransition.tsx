import React, { useEffect, useRef } from 'react'
import { ThemeProvider, Theme } from '@mui/material/styles'

interface ThemeTransitionProps {
  theme: Theme
  children: React.ReactNode
}

const ThemeTransition: React.FC<ThemeTransitionProps> = ({ theme, children }) => {
  const previousTheme = useRef(theme)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previousTheme.current !== theme) {
      const rootElement = rootRef.current

      if (rootElement) {
        rootElement.classList.add('theme-transition')

        const timeout = setTimeout(() => {
          rootElement.classList.remove('theme-transition')
        }, 500) // Match this duration with your CSS transition duration

        return () => {
          clearTimeout(timeout)
        }
      }
      previousTheme.current = theme
    }
  }, [theme])

  return (
    <div ref={rootRef}>
      <style>
        {`
          .theme-transition * {
            transition: background-color 0.5s ease, color 0.5s ease;
          }
        `}
      </style>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  )
}

export default ThemeTransition
