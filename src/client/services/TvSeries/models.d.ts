type TvSeriesDetailsPathParams = {
  series_id: number
}

type TvSeriesDetailsQuery = {
  append_to_response?: string
  language?: string
}

export type TDataTvSeriesDetails = {
  path: TvSeriesDetailsPathParams
  query?: TvSeriesDetailsQuery
}
