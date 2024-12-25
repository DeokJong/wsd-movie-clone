export const getImageURI = (path: string, size: string = 'original') => {
  if (!path) return import.meta.env.VITE_UNNKNOWN_IMAGE_URL
  return `${import.meta.env.VITE_IMAGE_BASE_URL}/${size}${path}`
}
