import React from 'react'
import { useNavigate } from '@tanstack/react-router'

import { PosterCard, PosterImage, PosterTitleContainer, PosterTitle } from './Poster.styles'

import { getImageURI } from '@/Utils'

type PosterData = {
  title: string
  image_path: string
  id: number
  media_type: string
}

export type PosterProps = {
  data: PosterData
  error: Error | null
}

export const Poster: React.FC<PosterProps> = ({ data, error }) => {
  const navigate = useNavigate()

  if (error) {
    return <div>{error.message}</div>
  }
  return (
    <PosterCard onClick={() => navigate({ to: `/detail/${data.id}/${data.media_type}` })}>
      <PosterImage
        src={data.image_path ? getImageURI(data.image_path, 'w500') : ''}
        alt={`${data.id.toString()} ${data.media_type}`}
      />
      <PosterTitleContainer>
        <PosterTitle>{data.title}</PosterTitle>
      </PosterTitleContainer>
    </PosterCard>
  )
}
