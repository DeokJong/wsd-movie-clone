export type MoviesPath = {
  time_window: 'day' | 'week'
}

export type MoviesQuery = {
  language: string
}

export type TDataTrending = {
  query?: MoviesQuery
  path: MoviesPath
}
