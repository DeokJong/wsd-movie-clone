export type FeatureResults = {
  adult: boolean
  backdrop_path?: string
  genre_ids?: number[]
  id: number
  original_language?: string
  overview?: string
  popularity: number
  poster_path?: string
  vote_average?: number
  vote_count?: number

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

  // Person 전용 필드
  media_type?: 'person' | 'movie' | 'tv' // 구분 필드 추가
  gender?: number
  known_for_department?: string
  profile_path?: string
}

export type DateRange = {
  maximum: string
  minimum: string
}

export type PublicFeature = {
  page: number
  results: FeatureResults[]
  total_pages: number
  total_results: number
  dates?: DateRange // dates 필드 추가
}
