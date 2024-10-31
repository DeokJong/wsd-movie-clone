import React from 'react'

import { PosterCard, PosterImage, PosterTitle } from './Poster.styles'

import { FeatureResults } from '@/Services'
import { getImageURI } from '@/Utils'

export type PosterProps = {
  data: FeatureResults[]
  isLoading: boolean
  error: Error | null
}

export const Poster: React.FC<PosterProps> = ({ data, isLoading, error }) => {
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return isLoading
    ? <div>Loading...</div>
    : <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {data?.map((iter: FeatureResults) => (
        <PosterCard key={iter.id}>
          <PosterImage>
            <img
              src={getImageURI(iter.poster_path ?? iter.profile_path ?? '', 'w185')}
              alt={iter.title || iter.original_title}
            />
          </PosterImage>
          <PosterTitle variant="body2">{iter.title || iter.original_title}</PosterTitle>
        </PosterCard>
      ))}
    </div>
}
