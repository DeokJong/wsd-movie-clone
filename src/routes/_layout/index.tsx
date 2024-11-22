import { createFileRoute } from '@tanstack/react-router'

import { Poster, HorizontalScrollContainer } from '@/Components'
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

  return (
    <>
      {/* TODO 검색 바 */}
      {/* TODO 최신 영화 및 TV */}
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
