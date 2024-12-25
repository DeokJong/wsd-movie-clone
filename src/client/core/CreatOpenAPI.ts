import { OpenAPIConfig, Interceptors } from './OpenAPI'

export const createOpenAPIConfig = (baseUrl: string): OpenAPIConfig => ({
  BASE: baseUrl,
  CREDENTIALS: 'include',
  ENCODE_PATH: undefined,
  HEADERS: undefined,
  PASSWORD: undefined,
  RESULT: 'body',
  TOKEN: async () => { return import.meta.env.VITE_ACCESS_TOKEN },
  USERNAME: undefined,
  VERSION: '0.1.0',
  WITH_CREDENTIALS: false,
  interceptors: { request: new Interceptors(), response: new Interceptors() },
})
