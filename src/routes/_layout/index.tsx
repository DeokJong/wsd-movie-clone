import { Button } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

import { DiscoverService } from '@/Services'

export const Route = createFileRoute('/_layout/')({
  component: index,
})

function index() {
  const callAPI = async () => {
    const response1 = await DiscoverService.Movie()
    console.log(response1)
    const response2 = await DiscoverService.TV()
    console.log(response2)
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={callAPI} />
    </>
  )
}
