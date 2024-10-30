export type TVQuery = {
  'air_date.gte'?: string
  'air_date.lte'?: string
  first_air_date_year?: number
  'first_air_date.gte'?: string
  'first_air_date.lte'?: string
  include_adult?: boolean // 기본값: false
  include_null_first_air_dates?: boolean // 기본값: false
  language?: string // 기본값: 'en-US'
  page?: number // 기본값: 1
  screened_theatrically?: boolean // boolean 타입
  sort_by?:
    | 'popularity.desc'
    | 'popularity.asc'
    | 'revenue.desc'
    | 'revenue.asc'
    | 'primary_release_date.desc'
    | 'primary_release_date.asc'
    | 'original_title.desc'
    | 'original_title.asc'
    | 'vote_average.desc'
    | 'vote_average.asc'
    | 'vote_count.desc'
    | 'vote_count.asc'
    | 'title.desc'
    | 'title.asc'
  timezone?: string // 문자열
  'vote_average.gte'?: number // float
  'vote_average.lte'?: number // float
  'vote_count.gte'?: number // float
  'vote_count.lte'?: number // float
  watch_region?: string // 문자열, watch 관련
  with_companies?: string // 쉼표 또는 파이프 구분
  with_genres?: string // 쉼표 또는 파이프 구분
  with_keywords?: string // 쉼표 또는 파이프 구분
  with_networks?: number // int32
  with_origin_country?: string // 문자열
  with_original_language?: string // 문자열
  'with_runtime.gte'?: number // int32
  'with_runtime.lte'?: number // int32
  with_status?: string // 가능한 값: [0, 1, 2, 3, 4, 5]
  with_watch_monetization_types?: string // 가능한 값: [flatrate, free, ads, rent, buy]
  with_watch_providers?: string // 쉼표 또는 파이프 구분
  without_companies?: string // 쉼표 또는 파이프 구분
  without_genres?: string // 쉼표 또는 파이프 구분
  without_keywords?: string // 쉼표 또는 파이프 구분
  without_watch_providers?: string // 쉼표 또는 파이프 구분
  with_type?: string // 가능한 값: [0, 1, 2, 3, 4, 5, 6]
}

export type TDataTV = {
  query?: TVQuery
}
