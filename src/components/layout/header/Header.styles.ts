// Header.styles.ts
import { List, ListItem, IconButton, styled, SvgIcon } from '@mui/material'
import { Theme } from '@mui/material/styles'

const commonTypographyStyles = {
  color: '#e5e5e5',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#b3b3b3',
  },
}

const commonIconButtonStyles = ({ theme }: { theme: Theme }) => ({
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.5,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.75rem',
    marginLeft: '10px',
  },
})

export const AppHeader = styled('header')(({ theme }) => ({
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 4%',
  backgroundColor: 'transparent',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  transition: 'background-color 0.3s ease',
  '&:hover, &.scrolled': {
    backgroundColor: '#141414',
  },
  [theme.breakpoints.down('md')]: {
    height: '56px',
  },
}))

export const HeaderLeft = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

export const HeaderRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

export const Logo = styled('div')({
  height: '30px',
  marginRight: '25px',
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
})

export const ThemeMode = styled(SvgIcon)(() => ({
  color: '#e5e5e5',
  cursor: 'pointer',
  '&:hover': {
    color: '#b3b3b3',
  },
}))

export const DesktopNavLinks = styled('nav')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const StyledList = styled(List)({
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  margin: 0,
})

export const DesktopListItem = styled(ListItem)(() => ({
  width: 'auto',
  padding: 0,
  marginRight: '20px',
  '& .MuiListItemText-root': {
    margin: 0,
  },
  '& .MuiTypography-root': {
    ...commonTypographyStyles,
    fontSize: '1.2rem',
  },
}))

export const IconButtonStyled = styled(IconButton)(commonIconButtonStyles)

export const DesktopMenuButton = styled(IconButtonStyled)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const MobileMenuButton = styled(IconButtonStyled)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

export const MobileNav = styled('div')(({ theme }) => ({
  display: 'none',
  justifyContent: 'space-between',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  right: '-100%',
  width: '50%',
  height: '100%',
  backgroundColor: '#141414',
  zIndex: 1001,
  transition: 'right 0.3s ease',
  '&.open': {
    right: 0,
  },
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}))

export const MobileNavTop = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

export const MobileNavBotton = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    padding: '5px',
    display: 'block',
  },
}))

export const MobileList = styled(List)(() => ({
  padding: 0,
  marginTop: '60px',
}))

export const MobileListItem = styled(ListItem)(() => ({
  padding: '5px',
  '& .MuiListItemText-root': {
    margin: 0,
  },
  '& .MuiTypography-root': {
    ...commonTypographyStyles,
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  },
}))

export const CloseButton = styled(IconButtonStyled)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '1.5rem',
})
