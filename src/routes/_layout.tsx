import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Box } from '@mui/material'

import { Header } from '@/Components'

export const Route = createFileRoute('/_layout')({
  component: layout,
})

function layout() {
  return (
    <Box
      sx={{
        background: ($theme) => $theme.palette.gradients.background,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundSize: 'cover',
        overflow: 'auto'
      }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: '80px',
          paddingX: {
            xs: 1, // 모바일에서 16px (2 * 8px)
            sm: 2, // 작은 화면에서 32px
            md: 8, // 중간 화면에서 64px
            lg: 12, // 큰 화면에서 96px
          },
          paddingY: {
            xs: 1, // 모바일에서 16px
            sm: 2, // 작은 화면에서 24px
            md: 4, // 중간 화면에서 32px
            lg: 5, // 큰 화면에서 40px
          },
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
