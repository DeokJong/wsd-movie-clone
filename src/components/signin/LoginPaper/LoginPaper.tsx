import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material'

import { loginStyles } from '../Common.styles'

import { AuthError, useAuth } from '@/Hooks'
import { ErrorModal } from '@/Components'

type FormData = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginPaper: React.FC<{ onSignUpClick: () => void }> = ({ onSignUpClick }) => {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const navigate = useNavigate()

  // 에러 모달 상태
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data: FormData) => {
    const { email, password, rememberMe } = data
    try {
      login({ email, rawPassword: password }, rememberMe)
      navigate({ to: '/' })
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        setErrorMessage(error.message)
        setErrorModalOpen(true)
      } else {
        console.error(error)
        setErrorMessage('An unexpected error occurred.')
        setErrorModalOpen(true)
      }
    }
  }

  return (
    <Paper elevation={4} sx={loginStyles.paper}>
      <Typography variant="h4" component="h1" sx={loginStyles.title}>
        Sign In
      </Typography>
      <Box component="form" sx={loginStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={loginStyles.textField}
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={loginStyles.textField}
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register('rememberMe')}
              sx={loginStyles.checkbox}
            />
          }
          label="Remember Me"
          sx={loginStyles.checkboxLabel}
        />

        <Button type="submit" variant="contained" color="primary" sx={loginStyles.primaryButton}>
          Log In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={loginStyles.secondaryButton}
          onClick={onSignUpClick}
        >
          Sign Up
        </Button>
      </Box>
      {/* 에러 모달 */}
      <ErrorModal
        open={errorModalOpen}
        errorMessage={errorMessage}
        onClose={() => setErrorModalOpen(false)}
      />
    </Paper>
  )
}
