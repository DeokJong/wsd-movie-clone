import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Box, Typography, Grid, Chip, Divider, CircularProgress, Fade, IconButton } from '@mui/material'
import { BookmarkAdd as BookmarkAddIcon, BookmarkRemove as BookmarkRemoveIcon } from '@mui/icons-material'

import { PublicFeatureDetail } from '@/Services'
import { fetchFeatureDetail, getImageURI } from '@/Utils'
import { detailStyles } from '@/Components'
import { useUserData } from '@/Hooks'

export const Route = createFileRoute('/_layout/detail/$id/$media_type')({
  component: Detail,
})

function Detail() {
  const { id, media_type: mediaType } = Route.useParams()
  const [detail, setDetail] = useState<PublicFeatureDetail>()
  const [loading, setLoading] = useState(true)
  const { featureSummary, appendWishList, removeWishList } = useUserData()

  useEffect(() => {
    (async () => {
      const data = await fetchFeatureDetail({ data: { id: Number(id), media_type: mediaType } })
      setDetail(data)
      setLoading(false)
    })()
  }, [id, mediaType])

  if (!detail) {
    return (
      <Box sx={detailStyles.container}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      </Box>
    )
  }

  // `in` 연산자를 사용하여 타입 구분
  const isMovie = 'title' in detail

  const isInWishList = featureSummary.some(
    (item) => item.id === detail.id && item.media_type === mediaType
  )

  return (
    <Box sx={detailStyles.container}>
      {/* Header Section */}
      <Fade in={!loading} timeout={1000}>
        <Box sx={detailStyles.header}>
          {detail.poster_path && (
            <Box
              component="img"
              src={`${getImageURI(detail.poster_path, 'w500')}`}
              alt={isMovie ? detail.title : detail.name}
              sx={detailStyles.posterImage}
            />
          )}
          <Box sx={detailStyles.headerText}>
            <Typography variant="h3" gutterBottom>
              {isMovie ? detail.title : detail.name || detail.original_name}
            </Typography>
            {detail.tagline && (
              <Typography variant="h5" gutterBottom>
                {detail.tagline}
              </Typography>
            )}
            <Typography variant="body1">{detail.overview}</Typography>
            <Divider sx={detailStyles.divider} />

            {/* 추가 데이터: 영화 */}
            {isMovie && (
              <>
                <Typography variant="body2">
                  <strong>Release Date:</strong> {isMovie ? detail.release_date : 'N/A'}
                </Typography>
                <Typography variant="body2">
                  <strong>Runtime:</strong> {detail.runtime} minutes
                </Typography>
                <Typography variant="body2">
                  <strong>Origin Country:</strong> {detail.origin_country.join(', ')}
                </Typography>
              </>
            )}

            {/* 추가 데이터: TV 쇼 */}
            {!isMovie && (
              <>
                <Typography variant="body2">
                  <strong>First Air Date:</strong> {detail.first_air_date}
                </Typography>
                <Typography variant="body2">
                  <strong>Last Air Date:</strong> {detail.last_air_date}
                </Typography>
                <Typography variant="body2">
                  <strong>Number of Seasons:</strong> {detail.number_of_seasons}
                </Typography>
                <Typography variant="body2">
                  <strong>Number of Episodes:</strong> {detail.number_of_episodes}
                </Typography>
                <Typography variant="body2">
                  <strong>Languages:</strong> {detail.languages.join(', ')}
                </Typography>
              </>
            )}

            <Divider sx={detailStyles.divider} />
            {/* Bookmark */}
            {isInWishList
              ? <Fade in={true} timeout={500}>
                <IconButton onClick={() => removeWishList(detail.id)} sx={detailStyles.bookmarkRemoveButton}>
                  <BookmarkRemoveIcon />
                </IconButton>
              </Fade>
              : <Fade in={true} timeout={500}>
                <IconButton onClick={() => appendWishList(detail.id, mediaType)} sx={detailStyles.bookmarkAddButton}>
                  <BookmarkAddIcon />
                </IconButton>
              </Fade>
            }
          </Box>
        </Box>
      </Fade>

      {/* Metadata Section */}
      <Fade in={!loading} timeout={1200}>
        <Box sx={detailStyles.metadataSection}>
          <Typography variant="subtitle1" gutterBottom>
            Details
          </Typography>
          <Grid container sx={detailStyles.metadataGrid} spacing={2}>
            <Grid item>
              <Typography variant="body2">Vote Average: {detail.vote_average} / 10</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Vote Count: {detail.vote_count}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Status: {detail.status}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Fade>

      {/* Genres Section */}
      <Fade in={!loading} timeout={1400}>
        <Box sx={detailStyles.genreSection}>
          <Typography variant="subtitle1">Genres</Typography>
          <Box sx={detailStyles.genreChip}>
            {detail.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={detailStyles.genreChip} />
            ))}
          </Box>
        </Box>
      </Fade>

      {/* Production Companies Section */}
      <Fade in={!loading} timeout={1600}>
        <Box sx={detailStyles.productionCompaniesSection}>
          <Typography variant="subtitle1">Production Companies</Typography>
          <Box sx={detailStyles.productionCompaniesContainer}>
            {detail.production_companies.map((company) => (
              <Box key={company.id} sx={detailStyles.productionCompanyBox}>
                {company.logo_path
                  ? <>
                    <Box
                      component="img"
                      src={`${getImageURI(company.logo_path, 'w500')}`}
                      alt={company.name}
                    />
                  </>
                  : <Typography
                    variant="subtitle2"
                    sx={{
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'center',
                      fontSize: 'clamp(5px, 4vw, 7px)',
                    }}
                  >
                    {company.name}
                  </Typography>
                }
              </Box>
            ))}
          </Box>
        </Box>
      </Fade>
    </Box>
  )
}
