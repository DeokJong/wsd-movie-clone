import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { PeopleListsService, FeatureResults } from '@/Services'

export const usePopular = () => {
  const [page, setPage] = useState<number>(1)

  const { data, error, isLoading } = useQuery<FeatureResults[], Error>({
    queryKey: ['peopleLists', 'popular', page],
    queryFn: async () =>
      (
        await PeopleListsService.Popular({
          query: {
            page,
          },
        })
      ).results
  })

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return { data, error, isLoading, handlePageChange }
}
