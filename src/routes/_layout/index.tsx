import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Fade, Pagination, Stack } from '@mui/material'

import { Poster, HorizontalScrollContainer, Banner } from '@/Components'
import { useTrendingMovies, useTrendingTV } from '@/Hooks'

export const Route = createFileRoute('/_layout/')({
  component: index,
})

function index() {
  const {
    data: trendingMovies,
    error: trendingMoviesError,
    isLoading: isTrendingMoviesLoading,
  } = useTrendingMovies()
  const {
    data: trendingTV,
    error: trendingTVError,
    isLoading: isTrendingTVLoading,
  } = useTrendingTV()

  const [currentPage, setCurrentPage] = useState(1)

  const paginatedMovie = useMemo(() => {
    if (!trendingMovies?.length) return null
    return trendingMovies[currentPage - 1] || null
  }, [trendingMovies, currentPage])

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Fade in={!!paginatedMovie} timeout={500}>
        <div>
          <Banner
            movie={{
              ...paginatedMovie,
              title: paginatedMovie?.title || paginatedMovie?.name || '',
              overview: paginatedMovie?.overview || '',
              backdrop_path: paginatedMovie?.backdrop_path || '',
              id: Number(paginatedMovie?.id) || 0,
            } || null}
            key={paginatedMovie?.id} // 배너가 바뀔 때 이미지를 넣기 위해 key 속성 추가
          />
        </div>
      </Fade>
      <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
        <Pagination
          count={trendingMovies?.length ?? 0}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={(theme) => ({
            '& .MuiPaginationItem-root': {
              color: theme.palette.TypographyColor.primary,
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: theme.palette.TypographyBackground.primary,
            },
          })}
        />
      </Stack>

      <h1>Discover Movie</h1>
      <HorizontalScrollContainer isLoading={isTrendingMoviesLoading}>
        {!isTrendingMoviesLoading &&
          trendingMovies?.map((data) => (
            <Poster
              key={data.id}
              data={{
                ...data,
                image_path: data.poster_path || '',
                title: data.title || data.name || '',
                media_type: data.media_type || '',
              }}
              error={trendingMoviesError}
            />
          ))}
      </HorizontalScrollContainer>
      <h1>Trending TV SHOW</h1>
      <HorizontalScrollContainer isLoading={isTrendingTVLoading}>
        {!isTrendingTVLoading &&
          trendingTV?.map((data) => (
            <Poster
              key={data.id}
              data={{
                ...data,
                image_path: data.poster_path || '',
                title: data.title || data.name || '',
                media_type: data.media_type || '',
              }}
              error={trendingTVError}
            />
          ))}
      </HorizontalScrollContainer>

      {/* TODO 카테고리별 섹션 */}
      {/* TODO 탐색 가능한 장르 */}
    </>
  )
}
