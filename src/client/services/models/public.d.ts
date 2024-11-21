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

type Creator = {
  id: number
  credit_id: string
  name: string
  original_name: string
  gender: number
  profile_path: string | null
}

type Genre = {
  id: number
  name: string
}

type Episode = {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number | null
  season_number: number
  show_id: number
  still_path: string | null
}

type Network = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

type ProductionCompany = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string | null
}

type ProductionCountry = {
  iso_3166_1: string
  name: string
}

type Season = {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  vote_average: number
}

type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

export type PublicFeatureDetail = {
  adult: boolean
  backdrop_path: string | null
  created_by: Creator[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: Episode
  name: string
  next_episode_to_air: Episode
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  seasons: Season[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}
