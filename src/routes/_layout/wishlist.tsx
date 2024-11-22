import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { isAuth, useUserData } from '@/Hooks'
import { Poster } from '@/Components'
import { PublicFeatureDetail } from '@/Services'
import { fetchFeatureDetail } from '@/Utils'

export const Route = createFileRoute('/_layout/wishlist')({
  component: WishList,
  beforeLoad: () => {
    if (!isAuth()) {
      alert('You must be logged in to view the wishlist.')
      throw redirect({ to: '/signin' })
    }
  },
})

function WishList() {
  const { featureSummary, isLoadingUserData } = useUserData()
  const [wishFeatures, setWishFeatures] = useState<PublicFeatureDetail[]>([])

  useEffect(() => {
    if (!isLoadingUserData && featureSummary.length > 0) {
      // featureSummary를 기반으로 데이터를 가져와서 중복 제거
      const fetchData = async () => {
        const fetchedData: PublicFeatureDetail[] = []

        for (const item of featureSummary) {
          const tempData = await fetchFeatureDetail({ data: item })

          // 중복된 항목을 방지하기 위해 alreadyFetched 배열에 포함된 아이템만 추가
          if (!fetchedData.some((fetchedItem) => fetchedItem.id === tempData.id)) {
            fetchedData.push(tempData)
          }
        }

        setWishFeatures(fetchedData) // 중복 제거된 데이터를 상태에 저장
      }

      fetchData()
    }
  }, [featureSummary, isLoadingUserData])

  if (isLoadingUserData) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>Wishlist</h1>
      {wishFeatures.length === 0
        ? <p>Your wishlist is empty.</p>
        : <Box display="flex" flexDirection="row" flexWrap="wrap">
          {wishFeatures.map((item) => (
            <Poster key={item.id} data={{
              title: 'title' in item ? item.title : item.name,
              image_path: item.poster_path ?? '',
              id: item.id,
              media_type: featureSummary.find((summary) => summary.id === item.id)?.media_type ?? '',
            }} error={null} />
          ))}
        </Box>
      }
    </>
  )
}
