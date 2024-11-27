import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { isAuth } from '../../custom'

import { TrendingService, FeatureResults } from '@/Services'

export const useTrendingAll = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day')

  const { data, error, isLoading } = useQuery<FeatureResults[], Error>({
    queryKey: ['trending', 'all', 'day'],
    queryFn: async () =>
      (
        await TrendingService.All({
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
