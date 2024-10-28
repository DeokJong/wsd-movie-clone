import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/wishlist')({
  component: () => <div>Hello /_layout/wishlist!</div>
})
