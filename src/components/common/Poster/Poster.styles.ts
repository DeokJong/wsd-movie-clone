import { styled } from '@mui/material/styles'
import { Card, CardMedia, Typography } from '@mui/material'

export const PosterCard = styled(Card)(({ theme }) => ({
  maxWidth: 200,
  margin: theme.spacing(2),
}))

export const PosterImage = styled(CardMedia)(({ theme }) => ({
  height: 300,
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
}))

export const PosterTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(1),
}))
