import { OpenAPIConfig, Interceptors } from './OpenAPI'

import { getKakaoAccessToken } from '@/Hooks'

export const createOpenAPIConfig = (baseUrl: string, isToken?: boolean): OpenAPIConfig => ({
  BASE: baseUrl,
  CREDENTIALS: 'include',
  ENCODE_PATH: undefined,
  HEADERS: undefined,
  PASSWORD: undefined,
  RESULT: 'body',
  TOKEN: () => {
    if (isToken) {
      return getKakaoAccessToken()
    }
    return import.meta.env.VITE_ACCESS_TOKEN
  },
  USERNAME: undefined,
  VERSION: '0.1.0',
  WITH_CREDENTIALS: false,
  interceptors: { request: new Interceptors(), response: new Interceptors() },
})
