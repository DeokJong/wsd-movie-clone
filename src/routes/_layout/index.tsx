import { createFileRoute } from '@tanstack/react-router'

import { Poster } from '@/Components'
import {
  useDiscoverMovie,
  useDiscoverTV,
  useTrendingAll,
  useTrendingMovies,
  useTrendingPeople,
  useTrendingTV,
} from '@/Hooks'

export const Route = createFileRoute('/_layout/')({
  component: index,
})

function index() {
  const { data: movieData, error: movieError, isLoading: movieIsLoading } = useDiscoverMovie()
  const { data: tvData, error: tvError, isLoading: tvIsLoading } = useDiscoverTV()
  const {
    data: trendingAllData,
    error: trendingAllError,
    isLoading: trendingAllIsLoading,
  } = useTrendingAll()
  const {
    data: trendingMoviesData,
    error: trendingMoviesError,
    isLoading: trendingMoviesIsLoading,
  } = useTrendingMovies()
  const {
    data: trendingPeopleData,
    error: trendingPeopleError,
    isLoading: trendingPeopleIsLoading,
  } = useTrendingPeople()
  const {
    data: trendingTVData,
    error: trendingTVError,
    isLoading: trendingTVIsLoading,
  } = useTrendingTV()

  return (
    <>
      {movieData && <Poster data={movieData} isLoading={movieIsLoading} error={movieError} />}
      {tvData && <Poster data={tvData} isLoading={tvIsLoading} error={tvError} />}
      {trendingAllData && (
        <Poster data={trendingAllData} isLoading={trendingAllIsLoading} error={trendingAllError} />
      )}
      {trendingMoviesData && (
        <Poster
          data={trendingMoviesData}
          isLoading={trendingMoviesIsLoading}
          error={trendingMoviesError}
        />
      )}
      {trendingPeopleData && (
        <Poster
          data={trendingPeopleData}
          isLoading={trendingPeopleIsLoading}
          error={trendingPeopleError}
        />
      )}
      {trendingTVData && (
        <Poster data={trendingTVData} isLoading={trendingTVIsLoading} error={trendingTVError} />
      )}
    </>
  )
}
