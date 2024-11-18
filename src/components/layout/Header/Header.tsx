// Header.tsx
import React, { useState, useEffect } from 'react'
import { Box, IconButton, ListItem, Typography } from '@mui/material'
import { Link, useNavigate } from '@tanstack/react-router'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import {
  ConfirmationNumber as TicketIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'

import {
  AppHeader,
  CloseButton,
  DesktopListItem,
  DesktopMenuButton,
  DesktopNavLinks,
  HeaderLeft,
  HeaderRight,
  IconButtonStyled,
  Logo,
  MobileList,
  MobileListItem,
  MobileMenuButton,
  MobileNav,
  MobileNavBotton,
  MobileNavTop,
  StyledList,
} from './Header.styles'

import { useAuth, useTheme } from '@/Hooks'

export const Header: React.FC = () => {
  const { isLogin, logout } = useAuth()
  const { toggleDarkmode, isDarkmode } = useTheme()
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
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
          <DesktopMenuButton>
            <DarkModeSwitch sunColor="white" onChange={toggleDarkmode} checked={isDarkmode} />
          </DesktopMenuButton>
          { isLogin
            ? <IconButtonStyled onClick={logout}>
              <LogoutIcon fontSize="large" style={{ color: '#FFFFFF' }} />
            </IconButtonStyled>
            : <IconButtonStyled onClick={removeKey}>
              <PersonIcon fontSize="large" style={{ color: '#FFFFFF' }} />
            </IconButtonStyled>
          }
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
          <MobileMenuButton>
            <DarkModeSwitch sunColor="white" onChange={toggleDarkmode} checked={isDarkmode} />
          </MobileMenuButton>
        </MobileNavBotton>
      </MobileNav>
    </Box>
  )
}
