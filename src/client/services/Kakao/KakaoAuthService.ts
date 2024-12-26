import { TAuthorizeRequest, TAuthorizeResponse, TTokenRequest, TTokenResponse } from './models'

import { OpenAPIKakaoAuth, CancelablePromise, request } from '@/Core'

export class KakaoService {
  public static token(data: TTokenRequest): CancelablePromise<TTokenResponse> {
    console.log(data)
    return request(OpenAPIKakaoAuth, {
      ...data,
      url: '/oauth/token',
      method: 'POST',
      mediaType: 'application/x-www-form-urlencoded;charset=utf-8',
    })
  }

  public static authorize(data: TAuthorizeRequest): CancelablePromise<TAuthorizeResponse> {
    return request(OpenAPIKakaoAuth, {
      ...data,
      url: '/oauth/authorize',
      method: 'GET',
      mediaType: 'application/x-www-form-urlencoded;charset=utf-8',
    })
  }

  // public static logout() {
  //   return request(OpenAPIKakao, {
  //     url: '/oauth/logout',
  //     method: 'GET',
  //   })
  // }
}
