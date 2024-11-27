import { toast } from 'react-toastify'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import {
  Box,
  CircularProgress,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Collapse,
} from '@mui/material'
import { motion } from 'framer-motion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import _ from 'lodash'

import { isAuth, useSearch } from '@/Hooks'
import { Poster } from '@/Components'
import { movieGenres, tvGenres, Genre } from '@/Constant'

export const Route = createFileRoute('/_layout/search')({
  component: SearchPage,
  beforeLoad: () => {
    if (!isAuth()) {
      toast.info('You must be logged in to view the application')
      throw redirect({ to: '/signin' })
    }
  },
})

function SearchPage() {
  const [onceIsSearch, setOnceIsSearch] = useState(false)
  const {
    searchData,
    isLoading,
    error,
    searchMovies,
    searchTV,
    appendMoviesPage,
    appendTVPage,
    moviesPage,
    tvPage,
  } = useSearch()
  const [query, setQuery] = useState<string>('')
  const [type, setType] = useState<'movie' | 'tv'>('movie')
  const [sortBy, setSortBy] = useState<'popularity' | 'vote_average' | 'title'>('popularity')
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [genres, setGenres] = useState<Genre[]>(movieGenres)
  const [showGenres, setShowGenres] = useState(false)
  const [sentinelElement, setSentinelElement] = useState<HTMLDivElement | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId])
  }

  const handleSearch = () => {
    if (!query.trim()) return

    // Reset the page number and clear previous results if necessary
    if (type === 'movie') {
      searchMovies({
        query: {
          query,
          page: 1,
        },
      })
    } else {
      searchTV({
        query: {
          query,
          page: 1,
        },
      })
    }

    setOnceIsSearch(true)
  }

  const loadMore = useCallback(() => {
    if (isLoadingMore || isLoading) return
    console.log('loadMore')
    setIsLoadingMore(true)
    if (type === 'movie') {
      appendMoviesPage({ query: { query, page: moviesPage + 1 } }).finally(() =>
        setIsLoadingMore(false))
    } else {
      appendTVPage({ query: { query, page: tvPage + 1 } }).finally(() =>
        setIsLoadingMore(false))
    }
  }, [type, query, moviesPage, tvPage, isLoadingMore, isLoading, appendMoviesPage, appendTVPage])

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && searchData.length > 0) {
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
  }, [loadMore, sentinelElement, searchData.length])

  const handleSortAndFilter = (data: typeof searchData) => {
    let filteredData = data

    if (selectedGenres.length) {
      filteredData = _.filter(filteredData, (item) =>
        _.every(selectedGenres, (genreId) =>
          _.some(item.genres || item.genres, (genre) =>
            typeof genre === 'number' ? genre === genreId : genre.id === genreId)))
    }

    switch (sortBy) {
      case 'vote_average':
        filteredData = _.orderBy(filteredData, ['vote_average'], ['desc'])
        break
      case 'popularity':
        filteredData = _.orderBy(filteredData, ['popularity'], ['desc'])
        break
      case 'title':
        filteredData = _.orderBy(
          filteredData,
          [(item) => ('title' in item ? item.title : item.name)],
          ['asc']
        )
        break
      default:
        break
    }

    return filteredData
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* 검색 입력 및 타입 선택 */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginBottom: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="outlined"
          fullWidth
          sx={(theme) => ({
            color: theme.palette.TypographyColor.primary,
            borderColor: theme.palette.TypographyColor.primary,
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: theme.palette.TypographyColor.secondary,
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.TypographyColor.secondary,
              color: theme.palette.TypographyColor.primary,
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.TypographyColor.primary,
            },
          })}
        />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setType('movie')
              setGenres(movieGenres)
            }}
            disabled={type === 'movie'}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              color: (theme) => theme.palette.TypographyColor.primary,
              borderColor: (theme) => theme.palette.TypographyColor.primary,
              '&:hover': {
                borderColor: (theme) => theme.palette.TypographyColor.secondary,
                backgroundColor: (theme) => theme.palette.concept.primary,
                opacity: 0.8,
              },
            }}
          >
            Movie
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setType('tv')
              setGenres(tvGenres)
            }}
            disabled={type === 'tv'}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              color: (theme) => theme.palette.TypographyColor.primary,
              borderColor: (theme) => theme.palette.TypographyColor.primary,
              '&:hover': {
                borderColor: (theme) => theme.palette.TypographyColor.secondary,
                backgroundColor: (theme) => theme.palette.concept.primary,
                opacity: 0.8,
              },
            }}
          >
            TV
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!query.trim()}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              backgroundColor: (theme) => theme.palette.concept.primary,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.concept.secondary,
              },
            }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowGenres((prev) => !prev)}
            endIcon={
              <ExpandMoreIcon
                sx={{
                  transform: showGenres ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            }
            sx={{
              width: { xs: '100%', sm: 'auto' },
              color: (theme) => theme.palette.TypographyColor.primary,
              borderColor: (theme) => theme.palette.TypographyColor.primary,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.concept.primary,
                color: (theme) => theme.palette.concept.secondary,
              },
            }}
          >
            Genres
          </Button>
        </Box>
      </Box>

      {/* 필터 및 정렬 UI */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginBottom: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'popularity' | 'vote_average' | 'title')}
          sx={{
            minWidth: 200,
            color: (theme) => theme.palette.TypographyColor.primary,
            '& .MuiSelect-icon': {
              color: (theme) => theme.palette.TypographyColor.primary,
            },
            '&:hover': {
              opacity: 0.8,
              backgroundColor: (theme) => theme.palette.concept.complementary,
              transition: 'background-color 0.3s ease',
            },
          }}
        >
          <MenuItem value="popularity">Popularity</MenuItem>
          <MenuItem value="vote_average">Vote Average</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </Box>

      {/* 장르 필터 */}
      <Collapse in={showGenres} timeout="auto" unmountOnExit>
        <Box sx={{ marginBottom: 2, transition: 'all 0.3s ease' }}>
          <FormGroup row sx={{ color: (theme) => theme.palette.TypographyColor.primary }}>
            {genres.map((genre) => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreToggle(genre.id)}
                    sx={{
                      color: (theme) => theme.palette.TypographyColor.primary,
                      transition: 'color 0.3s ease',
                      '&.Mui-checked': {
                        color: (theme) => theme.palette.concept.secondary,
                      },
                    }}
                  />
                }
                label={genre.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Collapse>

      {/* 로딩 상태 */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          >
            <CircularProgress />
          </motion.div>
        </Box>
      )}

      {/* 에러 상태 */}
      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          Error: {error}
        </Typography>
      )}

      {/* 검색 결과 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {handleSortAndFilter(searchData).map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Poster
              data={{
                id: item.id,
                title: 'name' in item ? item.name : item.title,
                image_path: item.poster_path || '',
                media_type: type,
              }}
              error={null}
            />
          </motion.div>
        ))}
      </Box>

      {/* 로딩 더보기 스피너 */}
      {isLoadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Intersection Observer를 위한 sentinel */}
      <div ref={setSentinelElement} />

      {/* 결과가 없을 경우 */}
      {onceIsSearch && !isLoading && searchData.length === 0 && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          No results found from the server for {query}.
        </Typography>
      )}

      {onceIsSearch &&
        !isLoading &&
        searchData.length > 0 &&
        handleSortAndFilter(searchData).length === 0 && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
            No results match the selected filters for {query}.
        </Typography>)}
    </Box>
  )
}
