// Header.tsx
import React, { useState, useEffect } from 'react'
import { Box, IconButton, ListItem, Typography } from '@mui/material'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ConfirmationNumber as TicketIcon,
  Person as PersonIcon,
  Bedtime as BedtimeIcon,
  Brightness7 as BrightnessIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material'

import {
  AppHeader,
  HeaderLeft,
  HeaderRight,
  Logo,
  DesktopNavLinks,
  IconButtonStyled,
  MobileMenuButton,
  MobileNav,
  CloseButton,
  StyledList,
  DesktopListItem,
  MobileList,
  MobileListItem,
  DesktopMenuButton,
  MobileNavTop,
  MobileNavBotton,
} from './Header.styles'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => localStorage.getItem('theme') === 'dark')
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const removeKey = () => {
    navigate({ to: '/signin' })
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleDarkMode = () => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
    }

    setIsDarkMode(prev => !prev)
    window.location.reload()
  }

  return (
    <Box id="container">
      <AppHeader className={isScrolled ? 'scrolled' : ''}>
        <HeaderLeft>
          <Logo>
            <IconButton component={Link} to="/">
              <TicketIcon fontSize="large" style={{ color: '#E50914' }} />
            </IconButton>
          </Logo>
          <DesktopNavLinks>
            <StyledList>
              <DesktopListItem disablePadding>
                <ListItem component={Link} to="/">
                  <Typography variant="h6">홈</Typography>
                </ListItem>
              </DesktopListItem>
              <DesktopListItem disablePadding>
                <ListItem component={Link} to="/popular">
                  <Typography variant="h6">대세 콘텐츠</Typography>
                </ListItem>
              </DesktopListItem>
              <DesktopListItem disablePadding>
                <ListItem component={Link} to="/wishlist">
                  <Typography variant="h6">내가 찜한 리스트</Typography>
                </ListItem>
              </DesktopListItem>
              <DesktopListItem disablePadding>
                <ListItem component={Link} to="/search">
                  <Typography variant="h6">찾아보기</Typography>
                </ListItem>
              </DesktopListItem>
            </StyledList>
          </DesktopNavLinks>
        </HeaderLeft>
        <HeaderRight>
          <DesktopMenuButton onClick={toggleDarkMode}>
            {localStorage.getItem('theme') === 'dark'
              ? <BedtimeIcon />
              : <BrightnessIcon />}
          </DesktopMenuButton>
          <IconButtonStyled onClick={removeKey}>
            <PersonIcon fontSize="large" style={{ color: '#FFFFFF' }} />
          </IconButtonStyled>
          <MobileMenuButton onClick={toggleMobileMenu}>
            <MenuIcon fontSize="large" />
          </MobileMenuButton>
        </HeaderRight>
      </AppHeader>

      <MobileNav className={isMobileMenuOpen ? 'open' : ''}>
        <MobileNavTop>
          <CloseButton onClick={toggleMobileMenu}>
            <CloseIcon fontSize="large" />
          </CloseButton>
          <MobileList>
            <MobileListItem disablePadding>
              <ListItem component={Link} to="/" onClick={toggleMobileMenu}>
                <Typography variant="h6">홈</Typography>
              </ListItem>
            </MobileListItem>
            <MobileListItem disablePadding>
              <ListItem component={Link} to="/popular" onClick={toggleMobileMenu}>
                <Typography variant="h6">대세 콘텐츠</Typography>
              </ListItem>
            </MobileListItem>
            <MobileListItem disablePadding>
              <ListItem component={Link} to="/wishlist" onClick={toggleMobileMenu}>
                <Typography variant="h6">내가 찜한 리스트</Typography>
              </ListItem>
            </MobileListItem>
            <MobileListItem disablePadding>
              <ListItem component={Link} to="/search" onClick={toggleMobileMenu}>
                <Typography variant="h6">찾아보기</Typography>
              </ListItem>
            </MobileListItem>
          </MobileList>
        </MobileNavTop>
        <MobileNavBotton>
          <MobileMenuButton onClick={toggleDarkMode}>
            {localStorage.getItem('theme') === 'dark'
              ? <BedtimeIcon />
              : <BrightnessIcon />}
          </MobileMenuButton>
        </MobileNavBotton>
      </MobileNav>
    </Box>
  )
}

export default Header
