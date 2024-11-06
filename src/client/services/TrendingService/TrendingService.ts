import { PublicFeature } from '../models'

import { TDataTrending } from './models.d'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class TrendingService {
  public static All(data: TDataTrending = {
    path: {
      time_window: 'day',
    }
  }): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      method: 'GET',
      url: '/trending/all/{time_window}',
      mediaType: 'application/json',
    })
  }

  public static Movies(
    data: TDataTrending = { path: { time_window: 'day' } }
  ): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      method: 'GET',
      url: '/trending/movie/{time_window}',
      mediaType: 'application/json',
    })
  }

  public static People(data: TDataTrending = {
    path: {
      time_window: 'day',
    }
  }): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      method: 'GET',
      url: '/trending/person/{time_window}',
      mediaType: 'application/json',
    })
  }

  public static TV(data: TDataTrending = {
    path: {
      time_window: 'day',
    }
  }): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      method: 'GET',
      url: '/trending/tv/{time_window}',
      mediaType: 'application/json',
    })
  }
}
