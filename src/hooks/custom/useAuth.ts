import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { errors } from '@/Constant'

export type User = {
  email: string
  password: string
}

export type Register = {
  email: string
  password: string
  confirmPassword: string
  fullName: string
}

export type AuthUser = {
  username: string
  fullName: string
}

export class AuthError extends Error {
  code: number

  constructor(code: number, message?: string) {
    const errorMessage =
      message ? `${code}: ${message}` : `${code}: ${errors[code] || 'An error occurred'}`
    super(errorMessage)
    this.code = code
    this.name = 'AuthError'
  }
}

const isAuthenticated = () => {
  return localStorage.getItem('currentUser') !== null
}

const checkRememberMe = () => {
  return localStorage.getItem('rememberMe') === 'true'
}

const setRememberMe = (value: boolean) => {
  localStorage.setItem('rememberMe', value.toString())
}

export const useAuth = () => {
  const queryClient = useQueryClient()
  const [isLogin, setIsLogin] = useState<boolean | null>(null)

  const register = ({ email, password, confirmPassword, fullName }: Register) => {
    if (password !== confirmPassword) {
      throw new AuthError(400) // 400 Bad Request
    }
    if (localStorage.getItem(`user:${email}`)) {
      throw new AuthError(409) // 409 Conflict
    }
    localStorage.setItem(`user:${email}`, password)
    localStorage.setItem(`user:${email}:fullName`, fullName)
  }

  const login = ({ email, password }: User, rememberMe: boolean = false) => {
    const storedPassword = localStorage.getItem(`user:${email}`)
    if (!storedPassword) {
      throw new AuthError(404, 'User not found')
    }
    if (storedPassword === password) {
      const fullName = localStorage.getItem(`user:${email}:fullName`) || ''
      const userObj: AuthUser = { username: email, fullName }

      localStorage.setItem('currentUser', JSON.stringify(userObj))
      if (rememberMe) {
        setRememberMe(true)
      }
      queryClient.setQueryData(['currentUser'], userObj)
      setIsLogin(true)
    } else {
      throw new AuthError(401, 'Invalid password')
    }
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setRememberMe(false)
    setIsLogin(false)

    // Invalidate the 'currentUser' query to refetch
    queryClient.invalidateQueries({ queryKey: ['currentUser'] })
  }

  return {
    checkRememberMe,
    isAuthenticated,
    register,
    login,
    logout,
    isLogin,
    setIsLogin,
  }
}
