import { PublicFeatureSummary } from '@/Hooks'
import { FeatureResults, MoviesService, TvSeriesService } from '@/Services'

type PosterParams = {
  id : number
  media_type: string
}

type FeatureDetailsParams = {
  data: PublicFeatureSummary | FeatureResults | PosterParams
}

export async function fetchFeatureDetail({ data }: FeatureDetailsParams) {
  if (data.media_type === 'movie') {
    const movieDetails = await MoviesService.Details({
      path: { movie_id: data.id },
    })
    return movieDetails
  } else if (data.media_type === 'tv') {
    const tvDetails = await TvSeriesService.Details({
      path: { series_id: data.id },
    })
    return tvDetails
  } else {
    throw new Error('Invalid media type')
  }
}
