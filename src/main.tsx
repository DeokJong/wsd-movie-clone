import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { CssBaseline } from '@mui/material'
import { Provider as JotaiProvider } from 'jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'
import { useTheme } from './hooks/custom/useTheme'
import ThemeTransition from './ThemeTransition'

const router = createRouter({ routeTree, basepath: '/wsd-movie-clone/' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const App = () => {
  const { theme } = useTheme()
  return (
    <ThemeTransition theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </ThemeTransition>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <App />
      </JotaiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
