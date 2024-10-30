export const getImageURI = (path: string, size: string = 'original') => {
  if (!path) return 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}
