import React from 'react'

import { PosterCard, PosterImage, PosterTitle } from './Poster.styles'

import { DiscoverResults } from '@/Services'
import { getImageURI } from '@/Utils'

export type PosterProps = {
  data: DiscoverResults[]
  isLoading: boolean
  error: Error | null
}

export const Poster: React.FC<PosterProps> = ({ data, isLoading, error }) => {
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
