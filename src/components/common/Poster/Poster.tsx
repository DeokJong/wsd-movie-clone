import React from 'react'

import { PosterCard, PosterImage, PosterTitleContainer, PosterTitle } from './Poster.styles'

import { getImageURI } from '@/Utils'

type PosterData = {
  title: string
  image_path: string
  id: number
}

export type PosterProps = {
  data: PosterData
  error: Error | null
}

export const Poster: React.FC<PosterProps> = ({ data, error }) => {
  if (error) {
    return <div>{error.message}</div>
  }
  return (
    <PosterCard>
      <PosterImage src={data.image_path ? getImageURI(data.image_path, 'w500') : ''} alt={data.id.toString()} />
      <PosterTitleContainer>
        <PosterTitle>{data.title}</PosterTitle>
      </PosterTitleContainer>
    </PosterCard>
  )
}
