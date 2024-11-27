import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { isAuth } from '../../custom'

import { DiscoverService, FeatureResults } from '@/Services'

export const useDiscoverMovie = () => {
  const [page, setPage] = useState(1)

  const { data, error, isLoading } = useQuery<FeatureResults[], Error>({
    queryKey: ['discover', 'movie', page],
    queryFn: async () =>
      (
        await DiscoverService.Movie({
          query: {
            page,
          },
        })
      ).results,
    enabled: isAuth(),
  })

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return { data, error, isLoading, handlePageChange }
}
