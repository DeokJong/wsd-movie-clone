import { Button } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

import { DiscoverService } from '@/Services'
import { Poster } from '@/Components'
import { useMovie, useTV } from '@/Hooks'

export const Route = createFileRoute('/_layout/')({
  component: index,
})

function index() {
  const { data: movieData, error: movieError, isLoading: movieIsLoading } = useMovie()
  const { data: tvData, error: tvError, isLoading: tvIsLoading } = useTV()

  const callAPI = async () => {
    const response1 = await DiscoverService.Movie()
    console.log(response1)
    const response2 = await DiscoverService.TV()
    console.log(response2)
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={callAPI} />
      {movieData && <Poster data={movieData} isLoading={movieIsLoading} error={movieError} />}
      {tvData && <Poster data={tvData} isLoading={tvIsLoading} error={tvError} />}
    </>
  )
}
