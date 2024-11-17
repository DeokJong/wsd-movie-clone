import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Box, Slide } from '@mui/material'

import { Header, LoginPaper, SignUpPaper } from '@/Components'

export const Route = createFileRoute('/signin')({
  component: SignIn,
})

function SignIn() {
  const [showSignUp, setShowSignUp] = useState(false)

  const handleToggle = () => {
    setShowSignUp((prev) => !prev)
  }

  return (
    <Box
      sx={{
        background: ($theme) => $theme.palette.gradients.background,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <Header />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // 화면을 넘지 않도록 설정
        }}
      >
        {/* LoginPaper */}
        <Slide direction="up" in={!showSignUp} mountOnEnter unmountOnExit timeout={500}>
          <Box
            sx={{
              width: '100%',
              position: 'absolute',
            }}
          >
            <LoginPaper onSignUpClick={handleToggle} />
          </Box>
        </Slide>

        {/* SignUpPaper */}
        <Slide direction="down" in={showSignUp} mountOnEnter unmountOnExit timeout={500}>
          <Box
            sx={{
              width: '100%',
              position: 'absolute',
            }}
          >
            <SignUpPaper onCancelClick={handleToggle} />
          </Box>
        </Slide>
      </Box>
    </Box>
  )
}
