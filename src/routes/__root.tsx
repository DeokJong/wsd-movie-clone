import React, { Suspense } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Box } from '@mui/material'

const TanStackRouterDevtools =
  import.meta.env.VITE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })))

export const Route = createRootRoute({
  component: () => (
    <Box
      sx={{
        overflow: 'hidden', // Hide overflow for the root
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </Box>
  ),
})
