import { Box } from '@mui/material'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { isAuth, useUserData } from '@/Hooks'

export const Route = createFileRoute('/_layout/wishlist')({
  component: wishlist,
  beforeLoad: () => {
    if (!isAuth()) {
      alert('You must be logged in to view the wishlist.')
      throw redirect({ to: '/signin' })
    }
  },
})

function wishlist() {
  const { wishListData, isLoadingUserData } = useUserData()

  if (isLoadingUserData) {
    return <p>Loading...</p>
  }

  return (
    <>
      {<Box>
        <h1>Wishlist</h1>
        {wishListData.length === 0
          ? <p>Your wishlist is empty.</p>
          : <ul>
            {wishListData.map((item) => (
              <li key={item.id}></li>
            ))}
          </ul>
        }
      </Box>
      }
    </>
  )
}
