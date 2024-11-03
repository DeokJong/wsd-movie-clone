import { styled } from '@mui/material/styles'
import { Card, Typography } from '@mui/material'

export const PosterCard = styled(Card)(({ theme }) => ({
  maxWidth: 200,
  margin: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}))

export const PosterImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 300,
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
}))

export const PosterTitleContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // 반투명 배경
  padding: theme.spacing(1),
  textAlign: 'center',
}))

export const PosterTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.TypographyColor.primary,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(16),
}))
