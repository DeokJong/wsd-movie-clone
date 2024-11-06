import { PublicFeature } from '../models'

import { TDataPopular } from './models'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class PeopleListsService {
  public static Popular(data?: TDataPopular): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      method: 'GET',
      url: '/person/popular',
      mediaType: 'application/json',
    })
  }
}
