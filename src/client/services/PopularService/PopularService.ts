import { PublicFeature } from '../models'

import { TDataPopular } from './models.d'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class PopularService {
  public static TV(data: TDataPopular = {}): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      query: {
        ...data?.query,
        language: 'ko',
      },
      method: 'GET',
      url: '/tv/popular',
      mediaType: 'application/json',
    })
  }

  public static Movies(data: TDataPopular = {}): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      query: {
        ...data?.query,
        language: 'ko',
      },
      method: 'GET',
      url: '/movie/popular',
      mediaType: 'application/json',
    })
  }
}
