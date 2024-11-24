import { Typography, CircularProgress, Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useEffect, useState, useRef, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Movie, Tv } from '@mui/icons-material'

import { usePopularMovies, usePopularTV } from '@/Hooks'
import { Poster } from '@/Components'

export const Route = createFileRoute('/_layout/popular')({
  component: Popular,
})

function Popular() {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie')
  const {
    data: movies,
    error: movieError,
    isLoading: movieLoading,
    handleLoadMore: appendMovies,
  } = usePopularMovies()
  const {
    data: tvShows,
    error: tvError,
    isLoading: tvLoading,
    handleLoadMore: appendTVShows,
  } = usePopularTV()

  // sentinelRef 대신 sentinelElement 상태를 사용
  const [sentinelElement, setSentinelElement] = useState<HTMLDivElement | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const handleMediaTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMediaType: 'movie' | 'tv' | null
  ) => {
    if (newMediaType !== null) {
      setMediaType(newMediaType)
    }
  }

  const loadMore = useCallback(() => {
    if (mediaType === 'movie' && !movieLoading) {
      appendMovies()
    } else if (mediaType === 'tv' && !tvLoading) {
      appendTVShows()
    }
  }, [mediaType, movieLoading, tvLoading, appendMovies, appendTVShows])

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('Sentinel is intersecting, loading more...')
          loadMore()
        }
      },
      {
        rootMargin: '200px',
      }
    )

    if (sentinelElement) {
      observer.current.observe(sentinelElement)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [loadMore, sentinelElement])

  if (movieError) {
    return <Typography color="error">Error loading movies: {movieError.message}</Typography>
  }
  if (tvError) {
    return <Typography color="error">Error loading TV shows: {tvError.message}</Typography>
  }

  return (
    <Box sx={{ padding: 2 }} className="theme-transition">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3,
          position: 'absolute',
          top: { xs: 60, sm: 90 },
          left: 0,
          right: 0,
          zIndex: 2000,
        }}
      >
        <ToggleButtonGroup
          value={mediaType}
          exclusive
          onChange={handleMediaTypeChange}
          aria-label="media type"
          sx={{
            '& .MuiToggleButton-root': {
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: (theme) => theme.palette.TypographyColor.primary,
              padding: '8px 24px',
              '&.Mui-selected': {
                backgroundColor: (theme) => theme.palette.TypographyBackground.primary,
                color: 'white',
                '&:hover': {
                  opacity: 0.8,
                },
              },
              '&:hover': {
                opacity: 0.8,
              },
            },
          }}
        >
          <ToggleButton
            value="movie"
            aria-label="movie"
            sx={{
              '&.Mui-selected': (theme) => ({
                backgroundColor: theme.palette.TypographyBackground.primary,
                color: theme.palette.TypographyColor.primary,
                '&:hover': {
                  backgroundColor: theme.palette.TypographyBackground.primary,
                },
              }),
            }}
          >
            <Movie sx={{ mr: 1 }} />
            인기 영화
          </ToggleButton>
          <ToggleButton
            value="tv"
            aria-label="tv"
            sx={{
              '&.Mui-selected': (theme) => ({
                backgroundColor: theme.palette.TypographyBackground.primary,
                color: theme.palette.TypographyColor.primary,
                '&:hover': {
                  backgroundColor: theme.palette.TypographyBackground.primary,
                },
              }),
            }}
          >
            <Tv sx={{ mr: 1 }} />
            인기 TV 프로그램
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={mediaType}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Box
            sx={{
              marginTop: { xs: 5, sm: 5 },
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {mediaType === 'movie'
              ? movies?.map((movie) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: 'calc(50% - 8px)',
                        sm: 'calc(33.333% - 10.667px)',
                        md: 'calc(25% - 12px)',
                      },
                    }}
                  >
                    <Poster
                      data={{
                        title: movie.title || '',
                        image_path: movie.poster_path || '',
                        id: movie.id,
                        media_type: 'movie',
                      }}
                      error={movieError}
                    />
                  </Box>
                </motion.div>
              ))
              : tvShows?.map((tv) => (
                <motion.div
                  key={tv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: 'calc(50% - 8px)',
                        sm: 'calc(33.333% - 10.667px)',
                        md: 'calc(25% - 12px)',
                      },
                    }}
                  >
                    <Poster
                      data={{
                        title: tv.name || '',
                        image_path: tv.poster_path || '',
                        id: tv.id,
                        media_type: 'tv',
                      }}
                      error={tvError}
                    />
                  </Box>
                </motion.div>
              ))
            }
          </Box>

          {/* 로딩 스피너 */}
          {(mediaType === 'movie' && movieLoading) || (mediaType === 'tv' && tvLoading)
            ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
            : null}

          {/* Intersection Observer를 위한 sentinel */}
          <div ref={setSentinelElement} />
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}
