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
      <h1>Discover Movie</h1>
      <HorizontalScrollContainer isLoading={isTrendingMoviesLoading}>
        {!isTrendingMoviesLoading &&
          trendingMovies?.map((data) => (
            <Poster key={data.id} data={data} error={trendingMoviesError} />
          ))}
      </HorizontalScrollContainer>
      <h1>Trending TV SHOW</h1>
      <HorizontalScrollContainer isLoading={isTrendingTVLoading}>
        {!isTrendingTVLoading &&
          trendingTV?.map((data) => (
            <Poster key={data.id} data={data} error={trendingTVError} />
          ))}
      </HorizontalScrollContainer>
    </>
  )
}
