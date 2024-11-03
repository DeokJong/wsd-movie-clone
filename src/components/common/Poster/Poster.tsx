import React from 'react'

import { PosterCard, PosterImage, PosterTitleContainer, PosterTitle } from './Poster.styles'

import { FeatureResults } from '@/Services'
import { getImageURI } from '@/Utils'

export type PosterProps = {
  data: FeatureResults
  error: Error | null
}

export const Poster: React.FC<PosterProps> = ({ data, error }) => {
  if (error) {
    return <div>{error.message}</div>
  }
  return (
    <PosterCard>
      <PosterImage src={data.poster_path ? getImageURI(data.poster_path, 'w500') : ''} alt={data.title} />
      <PosterTitleContainer>
        <PosterTitle variant="h6">{data.title}</PosterTitle>
      </PosterTitleContainer>
    </PosterCard>
  )
}
