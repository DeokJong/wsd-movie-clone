import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { TrendingService, FeatureResults } from '@/Services'

export const useTrendingPeople = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day')

  const { data, error, isLoading } = useQuery<FeatureResults[], Error>({
    queryKey: ['trending', 'people', 'day'],
    queryFn: async () =>
      (
        await TrendingService.People({
          path: {
            time_window: timeWindow,
          }
        })
      ).results
  })

  const handlePageChange = (timeWindow: 'day' | 'week') => {
    setTimeWindow(timeWindow)
  }

  return { data, error, isLoading, handlePageChange }
}
