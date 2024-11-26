import { styled } from '@mui/material/styles'
import { Box, Card, Typography } from '@mui/material'

export const PosterCard = styled(Card)(({ theme }) => ({
  background: theme.palette.TypographyBackground.primary,
  width: 200,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  flexShrink: 0,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease',
  },
  [theme.breakpoints.down('sm')]: {
    width: 100,
    '&:hover': {
      transform: 'none',
    },
    '&:active': {
      transform: 'scale(1.05)',
    },
  },
}))

export const PosterImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 300,
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
}))

export const PosterTitleContainer = styled(Box)(({ theme }) => ({
  bottom: 0,
  height: 60,
  width: '100%',
  backgroundColor: theme.palette.TypographyBackground.primary,
  padding: theme.spacing(1),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    height: 40,
  },
}))

export const PosterTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.TypographyColor.primary,
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(15),
  overflow: 'hidden', // 내용이 넘치는 경우 숨김
  display: '-webkit-box', // 플렉스 박스를 사용하여 줄바꿈을 가능하게 함
  WebkitBoxOrient: 'vertical', // 수직 방향으로 박스를 설정
  WebkitLineClamp: 2, // 최대 줄 수 설정
  lineClamp: 2, // 최대 줄 수 설정
  textOverflow: 'ellipsis', // 잘리면 ...으로 표시
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(10),
  },
}))
