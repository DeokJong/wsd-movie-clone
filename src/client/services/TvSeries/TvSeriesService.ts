import { PublicFeatureDetail } from '../models'

import { TDataTvSeriesDetails } from './models.d'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class TvSeriesService {
  public static Details(data: TDataTvSeriesDetails): CancelablePromise<PublicFeatureDetail> {
    return request(OpenAPIMovieDB, {
      ...data,
      method: 'GET',
      url: '/tv/{series_id}',
      mediaType: 'application/json',
    })
  }
}
