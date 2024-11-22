import { useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from './useAuth'

export type PublicFeatureSummary = {
  id: number
  timeStamps: string
  media_type: string
}

type UserPublic = {
  fullName: string
  wishList: PublicFeatureSummary[]
}

export const useUserData = () => {
  const { isLogin, email } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    data: userData,
    isLoading: isLoadingUserData,
    error: userDataError,
  } = useQuery<UserPublic | null, Error>({
    queryKey: ['userData', email],
    queryFn: () => {
      return {
        fullName: localStorage.getItem(`user:${email}:fullName`) || '',
        wishList: JSON.parse(localStorage.getItem(`user:${email}:wishList`) || '[]'),
      } as UserPublic
    },
    enabled: () => isLogin,
  })

  const userDataMutation = useMutation<PublicFeatureSummary[], Error, PublicFeatureSummary[]>({
    mutationFn: async (data: PublicFeatureSummary[]) => {
      data.sort((a, b) => new Date(b.timeStamps).getTime() - new Date(a.timeStamps).getTime())
      localStorage.setItem(`user:${email}:wishList`, JSON.stringify(data))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData', email] })
    },
  })

  const appendWishList = (id: number, mediaType: string) => {
    if (!isLogin) {
      alert('You must be logged in to add to wishlist.')
      navigate({ to: '/signin' })
      return
    }

    const wishList = userData?.wishList || []
    const newWishList = [...wishList, { id, timeStamps: new Date().toISOString(), media_type: mediaType }]
    userDataMutation.mutate(newWishList)
  }

  const removeWishList = (id: number) => {
    if (!isLogin) {
      alert('You must be logged in to add to wishlist.')
      navigate({ to: '/signin' })
      return
    }

    const wishList = userData?.wishList || []
    const newWishList = wishList.filter((wish) => wish.id !== id)
    userDataMutation.mutate(newWishList)
  }

  return {
    fullName: userData?.fullName || '',
    featureSummary: userData?.wishList || [],
    isLoadingUserData,
    userDataError,
    userDataMutation,
    appendWishList,
    removeWishList,
  }
}
