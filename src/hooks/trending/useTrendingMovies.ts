import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { TrendingService, FeatureResults } from '@/Services'

export const useTrendingMovies = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day')

  const { data, error, isLoading } = useQuery<FeatureResults[], Error>({
    queryKey: ['trending', 'movies', 'day'],
    queryFn: async () =>
      (
        await TrendingService.Movies({
          path: {
            time_window: timeWindow,
          }
        })
      ).results,
  })

  const handlePageChange = (timeWindow: 'day' | 'week') => {
    setTimeWindow(timeWindow)
  }

  return { data, error, isLoading, handlePageChange }
}
