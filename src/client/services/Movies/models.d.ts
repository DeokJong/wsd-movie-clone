type MovieDetailsPathParams = {
  movie_id: number
}

type MovieDetailsQuery = {
  append_to_response?: string
  language?: string
}

export type TDataMovieDetails = {
  path: MovieDetailsPathParams
  query?: MovieDetailsQuery
}
