import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { DiscoverService, FeatureResults } from '@/Services'

export const useDiscoverTV = () => {
  const [page, setPage] = useState(1)

  const { data, error, isLoading } = useQuery<FeatureResults[], Error>({
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
