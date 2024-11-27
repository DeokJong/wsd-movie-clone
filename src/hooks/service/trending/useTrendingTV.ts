import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { isAuth } from '../../custom'

import { TrendingService, FeatureResults } from '@/Services'

export const useTrendingTV = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day')

  const { data, error, isLoading } = useQuery<FeatureResults[], Error>({
    queryKey: ['trending', 'tv', 'day'],
    queryFn: async () =>
      (
        await TrendingService.TV({
          path: {
            time_window: timeWindow,
          }
        })
      ).results,
    enabled: isAuth(),
  })

  const handlePageChange = (timeWindow: 'day' | 'week') => {
    setTimeWindow(timeWindow)
  }

  return { data, error, isLoading, handlePageChange }
}
