import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/popular')({
  component: () => <div>Hello /_layout/popular!</div>
})
