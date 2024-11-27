import { PublicFeature } from '../models'

import { TDataMovie, TDataTV } from './models.d'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class DiscoverService {
  public static Movie(data?: TDataMovie): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      query: {
        ...data?.query,
        language: 'ko',
      },
      method: 'GET',
      url: '/discover/movie',
      mediaType: 'application/json',
    })
  }

  public static TV(data?: TDataTV): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      query: {
        ...data?.query,
        language: 'ko',
      },
      method: 'GET',
      url: '/discover/tv',
      mediaType: 'application/json',
    })
  }
}
