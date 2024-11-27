import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as JotaiProvider } from 'jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <App/>
      </JotaiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
