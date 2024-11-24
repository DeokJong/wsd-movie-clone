type SearchMovieQuery = {
  query: string
  include_adult?: boolean
  language?: string
  primary_release_year?: string
  page?: number
  region?: string
  year?: string
}

type SearchTVQuery = {
  query: string
  first_air_date_year?: string
  include_adult?: boolean
  language?: string
  page?: number
  year?: string
}

type SearchKeyword = {
  query: string
  page?: number
}

export type TDataSearch = {
  query: SearchMovieQuery | SearchTVQuery | SearchKeyword
}
