export type TTokenResponse = {
  token_type: string
  access_token: string
  id_token?: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope?: string
}

type TBodyTokenRequest = {
  grant_type: string
  client_id: string
  redirect_uri: string
  code: string
  client_secret?: string
}

export type TTokenRequest = {
  body: TBodyTokenRequest
}

type TQueryAuthorizeRequest = {
  response_type: string
  client_id: string
  redirect_uri: string
}

export type TAuthorizeRequest = {
  query: TQueryAuthorizeRequest
}

export type TAuthorizeResponse = {
  code?: string
  error?: string
  error_description?: string
  state?: string
}

export type Profile = {
  is_default_image: boolean
  nickname: string
}

export type KakaoAccount = {
  email: string
  email_needs_agreement: boolean
  has_email: boolean
  is_email_valid: boolean
  is_email_verified: boolean
  profile_nickname_needs_agreement: boolean
  profile: Profile
}

export type Properties = {
  nickname: string
}

export type TMeResponse = {
  id: number
  kakao_account: KakaoAccount
  properties: Properties
}
