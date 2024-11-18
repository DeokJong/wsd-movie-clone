import { useState, useEffect } from 'react'

type User = {
  username: string
  password: string
}

type Register = {
  username: string
  password: string
  confirmPassword: string
  fullName: string
}

type AuthUser = {
  username: string
  fullName: string
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const rememberMe = checkRememberMe()
    const savedUserString = localStorage.getItem('currentUser')

    if (rememberMe && savedUserString) {
      try {
        const savedUser: AuthUser = JSON.parse(savedUserString)
        setIsAuthenticated(true)
        setCurrentUser(savedUser)
      } catch (error) {
        console.error('Failed to parse currentUser from localStorage:', error)
        setIsAuthenticated(false)
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
      }
    }
  }, [])

  const checkRememberMe = () => {
    return localStorage.getItem('rememberMe') === 'true'
  }

  const setRememberMe = (value: boolean) => {
    localStorage.setItem('rememberMe', value.toString())
  }

  const register = ({ username, password, confirmPassword, fullName }: Register) => {
    if (password !== confirmPassword) {
      throw new Error('Not matched password')
    }

    localStorage.setItem(`user:${username}`, password)
    localStorage.setItem(`user:${username}:fullName`, fullName)
  }

  const login = ({ username, password }: User, rememberMe: boolean = false) => {
    const storedPassword = localStorage.getItem(`user:${username}`)

    if (storedPassword === password) {
      const fullName = localStorage.getItem(`user:${username}:fullName`) || ''
      const userObj: AuthUser = { username, fullName }

      setIsAuthenticated(true)
      setCurrentUser(userObj)
      localStorage.setItem('currentUser', JSON.stringify(userObj))

      if (rememberMe) {
        setRememberMe(true)
      }
      return true
    }

    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    setRememberMe(false)
  }

  return {
    isAuthenticated,
    currentUser,
    register,
    login,
    logout,
  }
}
