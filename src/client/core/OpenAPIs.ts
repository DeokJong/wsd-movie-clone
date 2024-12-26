import { createOpenAPIConfig } from './CreatOpenAPI'

export const OpenAPIMovieDB = createOpenAPIConfig(import.meta.env.VITE_API_URL)
export const OpenAPIImage = createOpenAPIConfig(import.meta.env.VITE_IMAGE_BASE_URL)
export const OpenAPIKakaoAuth = createOpenAPIConfig(import.meta.env.VITE_KAKAO_OAUTH_API_URL)
export const OpenAPIKakaoToken = createOpenAPIConfig(import.meta.env.VITE_KAKAO_TOKEN_API_URL, true)
