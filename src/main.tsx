import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider as JotaiProvider } from 'jotai'

import { routeTree } from './routeTree.gen'
import { useTheme } from './hooks/useTheme'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  const { theme } = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <JotaiProvider>
      <App />
    </JotaiProvider>
  </React.StrictMode>
)
