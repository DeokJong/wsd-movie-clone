import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Fade, Pagination, Stack } from '@mui/material'

import { Poster, HorizontalScrollContainer, Banner } from '@/Components'
import { useDiscoverMovie, useDiscoverTV } from '@/Hooks'

export const Route = createFileRoute('/_layout/')({
  component: index
})

function index() {
  const {
    data: discoverMovies,
    error: discoverMoviesError,
    isLoading: isDiscoverMoviesLoading,
  } = useDiscoverMovie()
  const {
    data: discoverTV,
    error: discoverTVError,
    isLoading: isDiscoverTVLoading,
  } = useDiscoverTV()

  const [currentPage, setCurrentPage] = useState(1)

  const paginatedMovie = useMemo(() => {
    if (!discoverMovies?.length) return null
    return discoverMovies[currentPage - 1] || null
  }, [discoverMovies, currentPage])

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  if (isDiscoverMoviesLoading || isDiscoverTVLoading) {
    return <div>Loading...</div>
  }

  console.log(discoverMovies)
  console.log(discoverTV)

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
          count={discoverMovies?.length ?? 0}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size={window.innerWidth < 600 ? 'medium' : 'large'}
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
      <HorizontalScrollContainer isLoading={isDiscoverMoviesLoading}>
        {!isDiscoverMoviesLoading &&
          discoverMovies?.map((data) => (
            <Poster
              key={data.id}
              data={{
                id: data.id,
                image_path: data.poster_path || '',
                title: data.title || data.name || '',
                media_type: 'title' in data ? 'movie' : 'tv',
              }}
              error={discoverMoviesError}
            />
          ))}
      </HorizontalScrollContainer>
      <h1>Discover TV SHOW</h1>
      <HorizontalScrollContainer isLoading={isDiscoverTVLoading}>
        {!isDiscoverTVLoading &&
          discoverTV?.map((data) => (
            <Poster
              key={data.id}
              data={{
                id: data.id,
                image_path: data.poster_path || '',
                title: data.title || data.name || '',
                media_type: 'title' in data ? 'movie' : 'tv',
              }}
              error={discoverTVError}
            />
          ))}
      </HorizontalScrollContainer>

      {/* TODO 카테고리별 섹션 */}
      {/* TODO 탐색 가능한 장르 */}
    </>
  )
}
