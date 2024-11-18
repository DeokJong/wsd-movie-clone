import { useQuery } from '@tanstack/react-query'

import { AuthUser, useAuth } from './useAuth'

export const useUserData = () => {
  const { isAuthenticated } = useAuth()

  const {
    data: userFullName,
    isLoading: isLoadingUserFullName,
    error: userFullNameError,
  } = useQuery<string | null, Error>({
    queryKey: ['currentUser'],
    queryFn: () => {
      const user = localStorage.getItem('currentUser') as unknown as AuthUser
      if (user) {
        return user.fullName
      }
      return null
    },
    enabled: isAuthenticated,
  })

  return { userFullName, isLoadingUserFullName, userFullNameError }
}
