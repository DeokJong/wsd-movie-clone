import { useEffect } from 'react'
import { atom, useAtom } from 'jotai'

import { errors } from '@/Constant'
import { BcryptEncoder } from '@/Utils'

export type TDataLogin = {
  email: string
  rawPassword: string
}

export type TDataRegister = {
  email: string
  password: string
  confirmPassword: string
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

const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

const getSessionStorage = (key: string) => {
  return sessionStorage.getItem(key)
}

const isRememberMe = () => {
  return localStorage.getItem('isRememberMe') === 'true'
}

export const isAuth = (): boolean => {
  console.log(getKakaoAccessToken())
  if (getKakaoAccessToken()) {
    return true
  }
  return isRememberMe() ? !!localStorage.getItem('email') : !!sessionStorage.getItem('email')
}

export const getPassword = () => {
  const email = sessionStorage.getItem('email') || localStorage.getItem('email')
  return localStorage.getItem(`user:${email}:password`)
}

export const getCurrentUserFullName = () => {
  const email = sessionStorage.getItem('email') || localStorage.getItem('email')
  return localStorage.getItem(`user:${email}:fullName`)
}

export const setCurrentUserFullName = (fullname: string, email: string) => {
  localStorage.setItem(`user:${email}:fullName`, fullname)
}

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser')
}

export const setKakaoAccessToken = (accessToken: string, isRememberMe?: boolean) => {
  if (isRememberMe) {
    localStorage.setItem('kakaoAccessToken', accessToken)
  } else {
    sessionStorage.setItem('kakaoAccessToken', accessToken)
  }
}

export const getKakaoAccessToken = () => {
  return localStorage.getItem('kakaoAccessToken') || sessionStorage.getItem('kakaoAccessToken')
}

const loginAtom = atom<boolean>(false)
const emailAtom = atom<string | null>(null)

export const useAuth = () => {
  const [isLogin, setIsLogin] = useAtom<boolean>(loginAtom)
  const [email, setEmail] = useAtom<string | null>(emailAtom)

  useEffect(() => {
    if (isRememberMe()) {
      if (getLocalStorage('email')) {
        setEmail(getLocalStorage('email'))
        setIsLogin(true)
      }
    } else {
      if (getSessionStorage('email')) {
        setEmail(getSessionStorage('email'))
        setIsLogin(true)
      }
    }
    if (getKakaoAccessToken()) {
      setIsLogin(true)
    }
  }, [])

  const register = ({ email, password, confirmPassword, fullName }: TDataRegister) => {
    if (password !== confirmPassword) {
      throw new AuthError(400, 'Password and confirm password do not match')
    }
    if (localStorage.getItem(`user:${email}:password`)) {
      throw new AuthError(409, 'Email already exists')
    }

    if (email.length === 0 || password.length === 0 || fullName.length === 0) {
      throw new AuthError(400, 'Email, password, and full name are required')
    }

    const hashedPassword = BcryptEncoder.hash(password)

    localStorage.setItem(`user:${email}:password`, hashedPassword)
    localStorage.setItem(`user:${email}:fullName`, fullName)
  }

  const login = ({ email, rawPassword }: TDataLogin, isRememberMe: boolean) => {
    const storedPassword = localStorage.getItem(`user:${email}:password`)
    if (!storedPassword) {
      throw new AuthError(404, 'User not found')
    } else if (!BcryptEncoder.compare(rawPassword, storedPassword)) {
      throw new AuthError(401, 'Invalid password')
    }

    if (isRememberMe) {
      localStorage.setItem('isRememberMe', 'true')
      localStorage.setItem('email', email)
    } else {
      localStorage.setItem('isRememberMe', 'false')
      sessionStorage.setItem('email', email)
    }

    setKakaoAccessToken('')
    setKakaoAccessToken('', isRememberMe)
  }

  const logout = () => {
    localStorage.removeItem('email')
    sessionStorage.removeItem('email')
    localStorage.removeItem('isRememberMe')
    setIsLogin(false)
    setKakaoAccessToken('')
    window.location.reload()
  }

  return {
    email,
    register,
    login,
    logout,
    isLogin,
    setIsLogin,
  }
}
