// Header.tsx
import React, { useState, useEffect } from 'react'
import { Box, IconButton, ListItem, ListItemText } from '@mui/material'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ConfirmationNumber as TicketIcon,
  Person as PersonIcon,
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
  StyledListItem,
  MobileList,
} from './Header.styles'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
              <TicketIcon style={{ color: '#E50914' }} />
            </IconButton>
          </Logo>
          <DesktopNavLinks>
            <StyledList>
              <StyledListItem disablePadding>
                <ListItem component={Link} to="/">
                  <ListItemText primary="홈" />
                </ListItem>
              </StyledListItem>
              <StyledListItem disablePadding>
                <ListItem component={Link} to="/popular">
                  <ListItemText primary="대세 콘텐츠" />
                </ListItem>
              </StyledListItem>
              <StyledListItem disablePadding>
                <ListItem component={Link} to="/wishlist">
                  <ListItemText primary="내가 찜한 리스트" />
                </ListItem>
              </StyledListItem>
              <StyledListItem disablePadding>
                <ListItem component={Link} to="/search">
                  <ListItemText primary="찾아보기" />
                </ListItem>
              </StyledListItem>
            </StyledList>
          </DesktopNavLinks>
        </HeaderLeft>
        <HeaderRight>
          <IconButtonStyled onClick={removeKey}>
            <PersonIcon style={{ color: '#FFFFFF' }} />
          </IconButtonStyled>
          <MobileMenuButton onClick={toggleMobileMenu}>
            <MenuIcon />
          </MobileMenuButton>
        </HeaderRight>
      </AppHeader>
      <MobileNav className={isMobileMenuOpen ? 'open' : ''}>
        <CloseButton onClick={toggleMobileMenu}>
          <CloseIcon />
        </CloseButton>
        <MobileList>
          <StyledListItem disablePadding>
            <ListItem component={Link} to="/" onClick={toggleMobileMenu}>
              <ListItemText primary="홈" />
            </ListItem>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItem component={Link} to="/popular" onClick={toggleMobileMenu}>
              <ListItemText primary="대세 콘텐츠" />
            </ListItem>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItem component={Link} to="/wishlist" onClick={toggleMobileMenu}>
              <ListItemText primary="내가 찜한 리스트" />
            </ListItem>
          </StyledListItem>
          <StyledListItem disablePadding>
            <ListItem component={Link} to="/search" onClick={toggleMobileMenu}>
              <ListItemText primary="찾아보기" />
            </ListItem>
          </StyledListItem>
        </MobileList>
      </MobileNav>
    </Box>
  )
}

export default Header
