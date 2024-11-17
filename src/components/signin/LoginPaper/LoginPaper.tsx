import React from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

import { loginStyles } from '../Common.styles'

export const LoginPaper: React.FC<{ onSignUpClick: () => void }> = ({ onSignUpClick }) => {
  return (
    <Paper elevation={4} sx={loginStyles.paper}>
      <Typography variant="h4" component="h1" sx={loginStyles.title}>
        Sign In
      </Typography>
      <Box component="form" sx={loginStyles.form}>
        <TextField label="Email" variant="outlined" fullWidth sx={loginStyles.textField}/>
        <TextField label="Password" type="password" variant="outlined" fullWidth sx={loginStyles.textField}/>
        <Button type="submit" variant="contained" color="primary" sx={loginStyles.primaryButton}>
          Log In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={loginStyles.secondaryButton}
          onClick={onSignUpClick} // 회원가입 버튼 클릭 시 핸들러 실행
        >
          Sign Up
        </Button>
      </Box>
    </Paper>
  )
}
