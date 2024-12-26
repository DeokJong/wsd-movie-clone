/* eslint-disable max-len */
import { Button } from '@mui/material'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/temp')({
  component: temp,
  beforeLoad: () => {
    if (import.meta.env.VITE_ENV === 'production') {
      throw redirect({ to: '/' })
    }
  },
})

function temp() {
  // ✅ 아래처럼 window.location.href로 카카오에 리다이렉트

  return (
    <>
      <Button >Kakao Login</Button>
    </>
  )
}
