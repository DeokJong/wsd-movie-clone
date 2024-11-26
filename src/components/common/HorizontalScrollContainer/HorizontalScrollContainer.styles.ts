import { styled, Paper } from '@mui/material'

export const HorizontalScrollPaper = styled(Paper)({
  display: 'flex',
  overflowX: 'auto',
  flexShrink: 0,
  background: 'transparent',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
})
import { styled, Paper } from '@mui/material'

export const HorizontalScrollPaper = styled(Paper)({
  display: 'flex',
  overflowX: 'auto',
  flexShrink: 0,

  background: 'transparent',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
})
