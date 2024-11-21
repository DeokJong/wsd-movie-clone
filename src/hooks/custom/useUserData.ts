import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from './useAuth'

type WishPublic = {
  id: string
  timeStamps: string
}

type UserPublic = {
  fullName: string
  wishList: WishPublic[]
}

export const useUserData = () => {
  const { isLogin, email } = useAuth()
  const queryClient = useQueryClient()

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

  const userDataMutation = useMutation<WishPublic[], Error, WishPublic[]>({
    mutationFn: async (data: WishPublic[]) => {
      data.sort((a, b) => new Date(b.timeStamps).getTime() - new Date(a.timeStamps).getTime())
      localStorage.setItem(`user:${email}:wishList`, JSON.stringify(data))
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData', email] })
    },
  })

  const appendWishList = (id: string) => {
    const wishList = userData?.wishList || []
    const newWishList = [...wishList, { id, timeStamps: new Date().toISOString() }]
    userDataMutation.mutate(newWishList)
  }

  const removeWishList = (id: string) => {
    const wishList = userData?.wishList || []
    const newWishList = wishList.filter((wish) => wish.id !== id)
    userDataMutation.mutate(newWishList)
  }

  return {
    fullName: userData?.fullName || '',
    wishListData: userData?.wishList || [],
    isLoadingUserData,
    userDataError,
    userDataMutation,
    appendWishList,
    removeWishList,
  }
}
