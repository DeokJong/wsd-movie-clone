import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { DiscoverResults, DiscoverService } from '@/Services'

export const useTV = () => {
  const [page, setPage] = useState(1)

  const { data, error, isLoading } = useQuery<DiscoverResults[], Error>({
    queryKey: ['discover', 'tv', page],
    queryFn: async () =>
      (
        await DiscoverService.TV({
          query: {
            page,
          },
        })
      ).results,
  })

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return { data, error, isLoading, handlePageChange }
}
