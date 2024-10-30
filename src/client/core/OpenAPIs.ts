import { createOpenAPIConfig } from './CreatOpenAPI'

export const OpenAPIMovieDB = createOpenAPIConfig(import.meta.env.VITE_API_URL)
export const OpenAPIImage = createOpenAPIConfig(import.meta.env.VITE_IMAGE_BASE_URL)
