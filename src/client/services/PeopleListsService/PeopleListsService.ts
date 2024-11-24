import { PublicFeature } from '../models'

import { TDataPopularPeople } from './models'

import { OpenAPIMovieDB, CancelablePromise, request } from '@/Core'

export class PeopleListsService {
  public static Popular(data?: TDataPopularPeople): CancelablePromise<PublicFeature> {
    return request(OpenAPIMovieDB, {
      ...data,
      method: 'GET',
      url: '/person/popular',
      mediaType: 'application/json',
    })
  }
}
