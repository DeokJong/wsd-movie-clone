import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Box } from '@mui/material'

import Header from '../components/layout/header/Header'

export const Route = createFileRoute('/_layout')({
  component: Layout,
})

function Layout() {
  return (
    <Box sx={{
      background: 'black',
      height: '100vh',
    }}>
      <Header />
      <Outlet />
    </Box>
  )
}
