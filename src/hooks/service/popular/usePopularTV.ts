import { useInfiniteQuery } from '@tanstack/react-query'

import { PopularService, FeatureResults } from '@/Services'

export const usePopularTV = () => {
  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery<FeatureResults[], Error>({
    queryKey: ['popular', 'tv'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      (
        await PopularService.TV({
          query: {
            page: pageParam as number,
          },
        })
      ).results,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined
      return pages.length + 1
    },
  })

  const handleLoadMore = async () => {
    await fetchNextPage()
    console.log('fetchNextPage')
  }

  const combinedData = data?.pages.flat() || []

  return { data: combinedData, error, isLoading, handleLoadMore }
}
