import { PublicFeature } from '../models'

import { TDataMovieLists } from './models'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class PeopleListsService {
  public static NowPlaying(data?: TDataMovieLists): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      query: {
        ...data?.query,
        language: 'ko',
      },
      method: 'GET',
      url: '/movie/now_playing',
      mediaType: 'application/json',
    })
  }

  public static Popular(data?: TDataMovieLists): CancelablePromise<PublicFeature> {
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

  public static TopRated(data?: TDataMovieLists): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      query: {
        ...data?.query,
        language: 'ko',
      },
      method: 'GET',
      url: '/movie/top_rated',
      mediaType: 'application/json',
    })
  }

  public static Upcoming(data?: TDataMovieLists): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      query: {
        ...data?.query,
        language: 'ko',
      },
      method: 'GET',
      url: '/movie/upcoming',
      mediaType: 'application/json',
    })
  }
}
