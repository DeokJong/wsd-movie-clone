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

type DateRange = {
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

// 공통 타입 정의
type CommonFields = {
  adult: boolean
  backdrop_path: string | null
  genres: Genre[]
  homepage: string
  id: number
  original_language: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  vote_average: number
  vote_count: number
}

// Movie 타입 정의
type MovieDetail = CommonFields & {
  belongs_to_collection: unknown | null
  budget: number
  imdb_id: string | null
  origin_country: string[]
  original_title: string
  release_date: string
  revenue: number
  runtime: number | null
  title: string
  video: boolean
}

// TVShow 타입 정의
type TVShowDetail = CommonFields & {
  created_by: Creator[]
  episode_run_time: number[]
  first_air_date: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: Episode | null
  name: string
  next_episode_to_air: Episode | null
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  original_name: string
  seasons: Season[]
  type: string
}

export type PublicFeatureDetail = MovieDetail | TVShowDetail

type Keyword = {
  id: number
  name: string
}

export type PublicSearch = {
  page: number
  results: FeatureResults[] | Keyword[]
  total_pages: number
  total_results: number
}
