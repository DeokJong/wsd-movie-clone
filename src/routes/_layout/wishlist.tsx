import { useEffect, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'

import { isAuth, useUserData } from '@/Hooks'
import { ErrorModal } from '@/Components'

export const Route = createFileRoute('/_layout/wishlist')({
  component: wishlist,
  // Remove beforeLoad since we're handling auth in the component
})

function wishlist() {
  const { wishList } = useUserData()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth()) {
      setOpen(true)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    router.navigate({
      to: '/signin'
    })
  }

  return (
    <>
      <ErrorModal
        open={open}
        errorMessage="You must be logged in to view the wishlist."
        onClose={handleClose}
      />
      { isAuth() && (
        <div>
          <h1>Wishlist</h1>
          <ul>
            {wishList.map((item) => (
              <li key={item.id}>{item.timeStamps}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
