// styles.ts
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { List, ListItem } from '@mui/material'

export const AppHeader = styled('header')(() => ({
  height: '60px',
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

export const DesktopNavLinks = styled('nav')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const StyledList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  margin: 0,
}))

export const StyledListItem = styled(ListItem)(() => ({
  width: 'auto',
  padding: 0,
  marginRight: '20px',
  '& .MuiListItemText-root': {
    margin: 0,
  },
  '& .MuiListItem-button': {
    padding: 0,
  },
  '& .MuiTypography-root': {
    color: '#e5e5e5',
    fontSize: '0.85rem',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#b3b3b3',
    },
  },
}))

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '1.2rem',
  marginLeft: '20px',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.5,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.75rem',
    marginLeft: '10px',
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
    display: 'block',
  },
}))

export const MobileList = styled(List)(() => ({
  padding: 0,
  marginTop: '60px',
}))

export const MobileListItem = styled(ListItem)(() => ({
  padding: '10px 20px',
  '& .MuiListItemText-root': {
    margin: 0,
  },
  '& .MuiTypography-root': {
    color: '#e5e5e5',
    fontSize: '1.2rem',
    textDecoration: 'none',
    '&:hover': {
      color: '#b3b3b3',
    },
  },
}))

export const CloseButton = styled(IconButtonStyled)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '1.5rem',
})
