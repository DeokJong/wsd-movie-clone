import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Box } from '@mui/material'

import { Header } from '@/Components'

export const Route = createFileRoute('/_layout')({
  component: Layout,
})

function Layout() {
  return (
    <Box
      sx={{
        background: ($theme) => $theme.palette.gradients.background,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: '80px',
          paddingX: {
            xs: 4, // 모바일에서 16px (2 * 8px)
            sm: 6, // 작은 화면에서 32px
            md: 8, // 중간 화면에서 64px
            lg: 12, // 큰 화면에서 96px
          },
          paddingY: {
            xs: 2, // 모바일에서 16px
            sm: 3, // 작은 화면에서 24px
            md: 4, // 중간 화면에서 32px
            lg: 5, // 큰 화면에서 40px
          },
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // Outlet 내부 요소 간 간격
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
