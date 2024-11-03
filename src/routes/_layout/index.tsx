import { createFileRoute } from '@tanstack/react-router'
import { Grid } from '@mui/material'

import { Poster } from '@/Components'
import { useTrendingMovies, usePopular } from '@/Hooks'

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
    data: popularPeople,
    error: popularPeopleError,
    isLoading: isPopularPeopleLoading,
  } = usePopular()

  return (
    <>
      <h1>Discover Movie</h1>
      <Grid
        container
        spacing={2}
        sx={{
          background: 'transparent',
        }}
      >
        {!isTrendingMoviesLoading &&
          trendingMovies?.map((data) => (
            <Poster key={data.id} data={data} error={trendingMoviesError} />
          ))}
      </Grid>
      <h1>Popular People</h1>
      <Grid
        container
        spacing={2}
        sx={{
          background: 'transparent',
        }}
      >
        {!isPopularPeopleLoading &&
          popularPeople?.map((data) => (
            <Poster key={data.id} data={data} error={popularPeopleError} />
          ))}
      </Grid>
    </>
  )
}
