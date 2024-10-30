import React from 'react'

import { PosterCard, PosterImage, PosterTitle } from './Poster.styles'

import { useMovie } from '@/Hooks'
import { DiscoverResults } from '@/Services'
import { getImageURI } from '@/Utils'

export const Poster: React.FC = () => {
  const { data, isLoading, error } = useMovie()

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    isLoading
      ? <div>Loading...</div>
      : <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data?.map((iter: DiscoverResults) => (
          <PosterCard key={iter.id}>
            <PosterImage>
              <img src={getImageURI(iter.poster_path, 'w500')} alt={iter.title || iter.original_title} />
            </PosterImage>
            <PosterTitle variant="body2">{iter.title || iter.original_title}</PosterTitle>
          </PosterCard>
        ))}
      </div>
  )
}
