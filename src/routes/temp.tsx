/* eslint-disable max-len */
import { Button } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/temp')({
  component: temp,
})

function temp() {
  // ✅ 아래처럼 window.location.href로 카카오에 리다이렉트

  return (
    <>
      <Button >Kakao Login</Button>
    </>
  )
}
