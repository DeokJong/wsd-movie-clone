export type DiscoverResults = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number

  // TV 전용 필드
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string

  // Movie 전용 필드
  original_title?: string
  release_date?: string
  title?: string
  video?: boolean
}

export type DiscoverResponse = {
  page: number
  results: DiscoverResults[]
  total_pages: number
  total_results: number
}
