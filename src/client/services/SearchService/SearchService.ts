import { PublicSearch } from '../models'

import { TDataSearch } from './model.d'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class SearchService {
  public static searchMovies(data: TDataSearch): CancelablePromise<PublicSearch> {
    return request(OpenAPIMovieDB, {
      method: 'GET',
      url: '/search/movie',
      mediaType: 'application/json',
      ...data,
    })
  }

  public static searchTV(data: TDataSearch): CancelablePromise<PublicSearch> {
    return request(OpenAPIMovieDB, {
      method: 'GET',
      url: '/search/tv',
      mediaType: 'application/json',
      ...data,
    })
  }

  public static searchKeywords(data: TDataSearch): CancelablePromise<PublicSearch> {
    return request(OpenAPIMovieDB, {
      method: 'GET',
      url: '/search/keyword',
      mediaType: 'application/json',
      ...data,
    })
  }
}
