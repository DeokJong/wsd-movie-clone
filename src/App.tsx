import { CssBaseline } from '@mui/material'
import { RouterProvider } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify' // 추가된 부분
import 'react-toastify/dist/ReactToastify.css' // 추가된 부분

import ThemeTransition from './ThemeTransition'
import { router } from './router'

import { useTheme } from '@/Hooks'

const App = () => {
  const { theme } = useTheme()
  return (
    <ThemeTransition theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
      <ToastContainer /> {/* 추가된 부분 */}
    </ThemeTransition>
  )
}

export default App
