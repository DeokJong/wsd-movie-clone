import { OpenAPIConfig, Interceptors } from './OpenAPI'

import { getPassword } from '@/Hooks'

export const createOpenAPIConfig = (baseUrl: string): OpenAPIConfig => ({
  BASE: baseUrl,
  CREDENTIALS: 'include',
  ENCODE_PATH: undefined,
  HEADERS: undefined,
  PASSWORD: undefined,
  RESULT: 'body',
  TOKEN: getPassword() || undefined,
  USERNAME: undefined,
  VERSION: '0.1.0',
  WITH_CREDENTIALS: false,
  interceptors: { request: new Interceptors(), response: new Interceptors() },
})
