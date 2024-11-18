import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { atomWithDefault } from 'jotai/utils'
import { atom, useAtom } from 'jotai'

import { errors } from '@/Constant'

export type TDataLogin = {
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

const isRememberMe = () => {
  return localStorage.getItem('isRememberMe') === 'true'
}

const setIsRememberMe = (value: boolean) => {
  localStorage.setItem('isRememberMe', value.toString())
}

const getCurrentUserEmail = () => {
  return localStorage.getItem('currentUser') || ''
}

const setCurrentUserEmail = (email: string) => {
  localStorage.setItem('currentUser', email)
}

const isLoginWithEmail = () => {
  return !!getCurrentUserEmail()
}

const loginAtom = atom<boolean>(false)

export const useAuth = () => {
  const queryClient = useQueryClient()
  const [isLogin, setIsLogin] = useAtom<boolean>(loginAtom)

  useEffect(() => {
    const isRemember = isRememberMe()
    if (isRemember) {
      setIsLogin(true)
    }
  }, [setIsLogin])

  const register = ({ email, password, confirmPassword, fullName }: Register) => {
    if (password !== confirmPassword) {
      throw new AuthError(400)
    }
    if (localStorage.getItem(`user:${email}:password`)) {
      throw new AuthError(409)
    }
    localStorage.setItem(`user:${email}:password`, password)
    localStorage.setItem(`user:${email}:fullName`, fullName)
  }

  const login = ({ email, password }: TDataLogin, isRemeberMe: boolean) => {
    const storedPassword = localStorage.getItem(`user:${email}:password`)
    if (!storedPassword) {
      throw new AuthError(404, 'User not found')
    } else if (storedPassword !== password) {
      throw new AuthError(401, 'Invalid password')
    }

    if (isRemeberMe) {
      setIsRememberMe(true)
    }

    setCurrentUserEmail(email)
    setIsLogin(true)
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isRememberMe')
    setIsRememberMe(false)
    setIsLogin(false)
    queryClient.invalidateQueries({ queryKey: ['currentUser'] })
  }

  return {
    isRememberMe,
    isAuthenticated: () => isLogin,
    register,
    login,
    logout,
    isLogin,
    setIsLogin,
  }
}
