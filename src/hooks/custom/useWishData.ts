import { useQuery } from '@tanstack/react-query'

import { fetchFeatureDetail } from '@/Utils'
import { PublicFeatureDetail } from '@/Services'
import { isAuth, useUserData } from '@/Hooks'

export const useWishData = () => {
  const { featureSummary, isLoadingUserData } = useUserData()
  const { data: wishFeatures, isLoading, error } = useQuery<PublicFeatureDetail[], Error>({
    queryKey: ['wishFeatures'],
    queryFn: async () => {
      if (isLoadingUserData || featureSummary.length === 0) {
        return []
      }

      const fetchedData: PublicFeatureDetail[] = []

      for (const item of featureSummary) {
        const tempData = await fetchFeatureDetail({ data: item })

        if (!fetchedData.some((fetchedItem) => fetchedItem.id === tempData.id)) {
          fetchedData.push(tempData)
        }
      }

      return fetchedData
    },
    enabled: !isLoadingUserData && isAuth(),
  })

  return { wishFeatures, isLoading, error }
}
