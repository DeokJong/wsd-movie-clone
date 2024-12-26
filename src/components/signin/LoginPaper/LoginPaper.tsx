import React from 'react'
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

import { AuthError, useAuth, useToast } from '@/Hooks'
import { KakaoService } from '@/Services'

type FormData = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginPaper: React.FC<{ onSignUpClick: () => void }> = ({ onSignUpClick }) => {
  const { login } = useAuth()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const navigate = useNavigate()

  const onSubmit = (data: FormData) => {
    const { email, password, rememberMe } = data
    try {
      login({ email, rawPassword: password }, rememberMe)
      navigate({ to: '/' })
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred.')
      }
    }
  }

  const handleKakaoLogin = () => {
    const kakaoOAuthUrl = `${import.meta.env.VITE_KAKAO_OAUTH_API_URL}/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_KAKAO_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`
    try {
      KakaoService.authorize({
        query: {
          response_type: 'code',
          client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        },
      })
      window.location.href = kakaoOAuthUrl
    } catch (error) {
      toast.error('An unexpected error occurred.')
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
        <Button
          variant="contained"
          color="secondary"
          sx={loginStyles.kakaoButton}
          onClick={handleKakaoLogin}
        >
          Kakao Login
        </Button>
      </Box>
    </Paper>
  )
}
