import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { CssBaseline } from '@mui/material'
import { Provider as JotaiProvider } from 'jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'
import { useTheme } from './hooks/custom/useTheme'
import ThemeTransition from './ThemeTransition'

// 라우터 생성
const router = createRouter({
  routeTree,
  basepath: '/wsd-movie-clone/', // Vite와 GitHub Pages 설정에 맞춘 basepath
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// 리다이렉트 처리 함수
const handleRedirect = () => {
  const params = new URLSearchParams(window.location.search)
  const redirectPath = params.get('redirect')
  console.log('Current path:', window.location.pathname)
  console.log('redirectPath:', redirectPath)
  if (redirectPath && redirectPath.startsWith('index.html/')) {
    const newPath = redirectPath.replace('index.html/', '')
    router.navigate({ to: newPath }) // 라우터로 리다이렉트
  }
}

const queryClient = new QueryClient()

const App = () => {
  const { theme } = useTheme()

  // 컴포넌트가 마운트될 때 리다이렉트 처리
  useEffect(() => {
    handleRedirect()
  }, [])

  return (
    <ThemeTransition theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
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
