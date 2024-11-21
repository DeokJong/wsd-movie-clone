import { PublicFeatureDetail } from '../models'

import { TDataMovieDetails } from './models.d'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class MoviesService {
  public static Details(data: TDataMovieDetails): CancelablePromise<PublicFeatureDetail> {
    return request(OpenAPIMovieDB, {
      ...data,
      method: 'GET',
      url: '/movie/{movie_id}',
      mediaType: 'application/json',
    })
  }
}
