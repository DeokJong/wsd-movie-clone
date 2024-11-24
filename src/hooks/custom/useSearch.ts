import { useState, useCallback } from 'react'
import { uniqBy } from 'lodash'

import { PublicFeatureSummary } from './useUserData'

import { SearchService, PublicSearch, TDataSearch, FeatureResults, PublicFeatureDetail } from '@/Services'
import { fetchFeatureDetail } from '@/Utils'

export type SearchState = {
  data: PublicSearch | null
  isLoading: boolean
  error: string | null
}

const transformToPublicFeatureSummary = (results: FeatureResults[]): PublicFeatureSummary[] => {
  return results.map((result) => ({
    id: result.id,
    timeStamps: new Date().toISOString(),
    media_type: 'name' in result ? 'tv' : 'movie',
  }))
}

export const useSearch = () => {
  const [searchData, setSearchData] = useState<PublicFeatureDetail[]>([]) // Existing search data
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [moviesPage, setMoviesPage] = useState<number>(1) // Page state for movies
  const [tvPage, setTvPage] = useState<number>(1) // Page state for TV shows

  const fetchData = useCallback(
    async (fetchFunction: (data: TDataSearch) => Promise<PublicSearch>, params: TDataSearch) => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetchFunction(params)
        const featureSummaries = transformToPublicFeatureSummary(
          response.results as FeatureResults[]
        )

        const featureDetails = await Promise.all(
          featureSummaries.map((summary) => fetchFeatureDetail({ data: summary }))
        )

        // Remove duplicates when adding new data
        setSearchData((prevData) =>
          uniqBy([...prevData, ...featureDetails], 'id'))
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred.')
        }
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  // Movie search
  const searchMovies = useCallback(
    (params: TDataSearch) => {
      // Reset moviesPage and searchData when starting a new search
      setMoviesPage(1)
      setSearchData([])

      fetchData(SearchService.searchMovies, {
        query: {
          ...params.query,
          page: 1,
        },
      })
    },
    [fetchData]
  )

  // TV search
  const searchTV = useCallback(
    (params: TDataSearch) => {
      // Reset tvPage and searchData when starting a new search
      setTvPage(1)
      setSearchData([])

      fetchData(SearchService.searchTV, {
        query: {
          ...params.query,
          page: 1,
        },
      })
    },
    [fetchData]
  )

  // Append next page of movies
  const appendMoviesPage = async (params: TDataSearch) => {
    const newPage = moviesPage + 1
    setMoviesPage(newPage)
    await fetchData(SearchService.searchMovies, {
      query: {
        ...params.query,
        page: newPage,
      },
    })
  }

  // Append next page of TV shows
  const appendTVPage = async (params: TDataSearch) => {
    const newPage = tvPage + 1
    setTvPage(newPage)
    await fetchData(SearchService.searchTV, {
      query: {
        ...params.query,
        page: newPage,
      },
    })
  }

  return {
    searchData,
    isLoading,
    error,
    searchMovies,
    searchTV,
    moviesPage,
    tvPage,
    appendMoviesPage,
    appendTVPage,
  }
}
