import React from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

import { loginStyles } from '../Common.styles'

export const SignUpPaper: React.FC<{ onCancelClick: () => void }> = ({ onCancelClick }) => {
  return (
    <Paper elevation={4} sx={loginStyles.paper}>
      <Typography variant="h4" component="h1" sx={loginStyles.title}>
        Sign Up
      </Typography>
      <Box component="form" sx={loginStyles.form}>
        <TextField label="Full Name" variant="outlined" fullWidth sx={loginStyles.textField}/>
        <TextField label="Email" variant="outlined" fullWidth sx={loginStyles.textField}/>
        <TextField label="Password" type="password" variant="outlined" fullWidth sx={loginStyles.textField}/>
        <TextField label="Confirm Password" type="password" variant="outlined" fullWidth sx={loginStyles.textField}/>
        <Button
          variant="contained"
          color="primary"
          sx={loginStyles.primaryButton}
          onClick={onCancelClick}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={loginStyles.secondaryButton}
          onClick={onCancelClick} // 취소 버튼 클릭 시 핸들러 실행
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  )
}
