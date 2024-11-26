import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import { keyframes } from '@emotion/react'

import { getImageURI } from '@/Utils'

type Movie = {
  id: number
  title: string
  overview: string
  backdrop_path: string
}

type BannerProps = {
  movie: Movie | null
}

// 등장 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Banner: React.FC<BannerProps> = ({ movie }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  if (!movie) return null

  const backdropUrl = getImageURI(movie.backdrop_path, 'original')

  useEffect(() => {
    const img = new Image()
    img.src = backdropUrl
    img.onload = () => setIsLoading(false)
  }, [backdropUrl])

  return (
    <Card
      onClick={() => navigate({ to: `/detail/${movie.id}/movie` })}
      sx={{
        height: '60vh',
        maxWidth: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: '50px',
        backgroundImage: isLoading ? 'none' : `url(${backdropUrl})`,
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        animation: `${fadeIn} 0.5s ease-out`,
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {isLoading
        ? <Box
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="p" sx={{ color: 'white' }}>
            Loading...
          </Typography>
        </Box>
        : <CardContent
          sx={{
            padding: '50px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h3" component="h1" sx={{ marginBottom: '0.5rem' }}>
            {movie.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: '500px', marginBottom: '1rem', textAlign: 'left' }}
          >
            {movie.overview}
          </Typography>
        </CardContent>
      }
    </Card>
  )
}
