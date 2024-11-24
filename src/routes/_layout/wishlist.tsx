import { Box, CircularProgress } from '@mui/material'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { motion } from 'framer-motion'

import { isAuth, useWishData } from '@/Hooks'
import { Poster } from '@/Components'

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
  const { wishFeatures, isLoading, error } = useWishData()

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}
      >
        <CircularProgress />
      </motion.div>
    )
  }

  if (error) {
    return <p>Error loading wishlist: {error.message}</p>
  }

  return (
    <>
      <h1>Wishlist</h1>
      {wishFeatures?.length === 0
        ? <p>Your wishlist is empty.</p>
        : <Box display="flex" flexDirection="row" flexWrap="wrap">
          {wishFeatures?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Poster key={item.id} data={{
                title: 'title' in item ? item.title : item.name,
                image_path: item.poster_path ?? '',
                id: item.id,
                media_type: 'name' in item ? 'tv' : 'movie',
              }} error={null} />
            </motion.div>
          ))}
        </Box>
      }
    </>
  )
}
