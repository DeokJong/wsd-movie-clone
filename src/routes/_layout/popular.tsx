import {
  Typography,
  CircularProgress,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material'
import { useEffect, useState, useRef, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { GridView, Movie, Tv, ViewList } from '@mui/icons-material'

import { usePopularMovies, usePopularTV } from '@/Hooks'
import { Poster } from '@/Components'

export const Route = createFileRoute('/_layout/popular')({
  component: Popular,
})

function Popular() {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie')
  const [viewType, setViewType] = useState<'grid' | 'table'>('grid')
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

  const [sentinelElement, setSentinelElement] = useState<HTMLDivElement | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleMediaTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMediaType: 'movie' | 'tv' | null
  ) => {
    if (newMediaType !== null) {
      setMediaType(newMediaType)
    }
  }

  const handleViewTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newViewType: 'grid' | 'table' | null
  ) => {
    if (newViewType !== null) {
      setViewType(newViewType)
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const loadMore = useCallback(() => {
    if (mediaType === 'movie' && !movieLoading) {
      setIsLoadingMore(true)
      appendMovies().finally(() => setIsLoadingMore(false))
    } else if (mediaType === 'tv' && !tvLoading) {
      setIsLoadingMore(true)
      appendTVShows().finally(() => setIsLoadingMore(false))
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
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          top: { xs: 60, sm: 90 },
          left: 0,
          right: 0,
          zIndex: 2000,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
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

        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={handleViewTypeChange}
          aria-label="view type"
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
          <ToggleButton value="grid" aria-label="grid view">
            <GridView sx={{ mr: 1 }} />
            그리드 보기
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <ViewList sx={{ mr: 1 }} />
            테이블 보기
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={mediaType + viewType}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {viewType === 'grid'
            ? <Box
              sx={{
                marginTop: { xs: 15, sm: 5 },
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
            : <TableContainer component={Paper} sx={{ marginTop: { xs: 15, sm: 5 } }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>포스터</TableCell>
                    <TableCell>
                      {mediaType === 'movie' ? '영화 제목' : 'TV 프로그램 제목'}
                    </TableCell>
                    <TableCell>평점</TableCell>
                    <TableCell>개봉일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(mediaType === 'movie'
                    ? movies?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : tvShows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  )?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                          alt={mediaType === 'movie' ? item.title : item.name}
                          style={{ width: 50, height: 75, objectFit: 'cover' }}
                        />
                      </TableCell>
                      <TableCell>{mediaType === 'movie' ? item.title : item.name}</TableCell>
                      <TableCell>{item.vote_average?.toFixed(1)}</TableCell>
                      <TableCell>
                        {mediaType === 'movie' ? item.release_date : item.first_air_date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={mediaType === 'movie' ? movies?.length || 0 : tvShows?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          }

          {/* 로딩 스피너 */}
          {isLoadingMore && viewType === 'grid' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}
            >
              <CircularProgress />
            </motion.div>
          )}

          {/* Intersection Observer를 위한 sentinel */}
          {viewType === 'grid' && <div ref={setSentinelElement} />}
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}
