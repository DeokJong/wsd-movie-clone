import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { KakaoService, KakaoApiService } from '@/Services'
import { getKakaoAccessToken, setCurrentUserFullName, setKakaoAccessToken, useToast } from '@/Hooks'

export const Route = createFileRoute('/login/oauth2')({
  component: oauth2,
})

interface SearchParams {
  code: string
}
type SearchCode = Pick<SearchParams, 'code'>

function oauth2() {
  const toast = useToast()
  const [code, setCode] = useState<string>('')

  const search = useSearch({
    from: '/login/oauth2',
  })

  useEffect(() => {
    const { code }: SearchCode = search as SearchCode
    setCode(code)
  }, [search])

  useEffect(() => {
    const fetchToken = async () => {
      if (code) {
        const response = await KakaoService.token({
          body: {
            grant_type: 'authorization_code',
            client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
            redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
            code,
          },
        })
        setKakaoAccessToken(response.access_token)
      }
      if (getKakaoAccessToken()) {
        const response2 = await KakaoApiService.me()
        console.log(response2)
        setCurrentUserFullName(response2.properties.nickname, response2.kakao_account.email)
        localStorage.setItem('email', response2.kakao_account.email)
        window.location.href = '/'
      }
    }
    try {
      fetchToken()
    } catch (error) {
      toast.error('An unexpected error occurred.')
    }
  }, [code])

  return (
    <div>
      Redirecting...
    </div>
  )
}
