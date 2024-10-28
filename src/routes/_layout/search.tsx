import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/search')({
  component: () => <div>Hello /_layout/search!</div>
})
