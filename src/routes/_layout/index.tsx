import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: index,
})

function index() {
  return (
    <>
    Hello world!
    </>
  )
}
