import { useEffect, useState } from 'react'
import { useAtom, atom } from 'jotai'
import { Theme } from '@mui/material'

import { whiteTheme, darkTheme } from '../../theme'

const darkmodeAtom = atom<boolean>(localStorage.getItem('theme') === 'dark')

export const useTheme = () => {
  const [isDarkmode, setIsDarkmode] = useAtom(darkmodeAtom)
  const [theme, setTheme] = useState<Theme>(isDarkmode ? darkTheme : whiteTheme)

  const toggleDarkmode = () => {
    setIsDarkmode((prev) => {
      const newValue = !prev
      localStorage.setItem('theme', newValue ? 'dark' : 'light')
      return newValue
    })
  }

  useEffect(() => {
    setTheme(isDarkmode ? darkTheme : whiteTheme)
  }, [isDarkmode])

  return {
    isDarkmode,
    theme,
    toggleDarkmode
  }
}
