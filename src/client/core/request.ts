import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

import { ApiError } from './ApiError'
import type { ApiRequestOptions } from './ApiRequestOptions'
import type { ApiResult } from './ApiResult'
import { CancelablePromise } from './CancelablePromise'
import type { OnCancel } from './CancelablePromise'
import type { OpenAPIConfig } from './OpenAPI'

/**
 * 입력된 값이 문자열인지 확인합니다.
 * @param value - 입력값
 * @returns 문자열인지 여부
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

/**
 * 입력된 값이 비어있지 않은 문자열인지 확인합니다.
 * @param value - 입력값
 * @returns 비어있지 않은 문자열인지 여부
 */
export const isStringWithValue = (value: unknown): value is string => {
  return isString(value) && value !== ''
}

/**
 * 입력된 값이 Blob 객체인지 확인합니다.
 * @param value - 입력값
 * @returns Blob 객체인지 여부
 */
export const isBlob = (value: unknown): value is Blob => {
  return value instanceof Blob
}

/**
 * 입력된 값이 FormData 객체인지 확인합니다.
 * @param value - 입력값
 * @returns FormData 객체인지 여부
 */
export const isFormData = (value: unknown): value is FormData => {
  return value instanceof FormData
}

/**
 * HTTP 상태 코드가 성공 범위(200-299)에 있는지 확인합니다.
 * @param status - HTTP 상태 코드(number)
 * @returns 성공 범위에 있는지 여부
 */
export const isSuccess = (status: number): boolean => {
  return status >= 200 && status < 300
}

/**
 * 문자열을 Base64로 인코딩합니다.
 * @param str - 인코딩할 문자열
 * @returns Base64로 인코딩된 문자열
 */
export const base64 = (str: string): string => {
  try {
    return btoa(str)
  } catch (err) {
    return Buffer.from(str).toString('base64')
  }
}

/**
 * 객체를 쿼리 문자열로 변환합니다.
 * @param params - 변환할 객체
 * @returns 쿼리 문자열
 */
export const getQueryString = (params: Record<string, unknown>): string => {
  const qs: string[] = []

  const append = (key: string, value: unknown) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  }

  const encodePair = (key: string, value: unknown) => {
    if (value === undefined || value === null) {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((v) => encodePair(key, v))
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => encodePair(`${key}[${k}]`, v))
    } else {
      append(key, value)
    }
  }

  Object.entries(params).forEach(([key, value]) => encodePair(key, value))

  return qs.length ? `?${qs.join('&')}` : ''
}

/**
 * OpenAPI 설정과 요청 옵션을 사용하여 요청 URL을 생성합니다.
 * @param config - OpenAPI 설정 객체
 * @param options - API 요청 옵션
 * @returns 요청 URL
 */
const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
  const encoder = config.ENCODE_PATH || encodeURI

  const path = options.url
    .replace('{api-version}', config.VERSION)
    .replace(/{(.*?)}/g, (substring: string, group: string) =>
      options.path !== undefined && Object.prototype.hasOwnProperty.call(options.path, group)
        ? encoder(String(options.path[group]))
        : substring)

  const url = config.BASE + path
  return options.query ? url + getQueryString(options.query) : url
}

/**
 * 요청 옵션에서 FormData를 생성합니다.
 * @param options - API 요청 옵션
 * @returns 생성된 FormData 또는 undefined
 */
export const getFormData = (options: ApiRequestOptions): FormData | undefined => {
  if (options.formData) {
    const formData = new FormData()

    const process = (key: string, value: unknown) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value)
      } else {
        formData.append(key, JSON.stringify(value))
      }
    }

    Object.entries(options.formData)
      .filter(([, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => process(key, v))
        } else {
          process(key, value)
        }
      })

    return formData
  }
  return undefined
}

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>

/**
 * 요청 옵션을 사용하여 리졸버 함수를 실행합니다.
 * @param options - API 요청 옵션
 * @param resolver - 리졸버 함수 또는 값
 * @returns 리졸버 결과 또는 값
 */
export const resolve = async <T>(
  options: ApiRequestOptions,
  resolver?: T | Resolver<T>
): Promise<T | undefined> => {
  if (typeof resolver === 'function') {
    return (resolver as Resolver<T>)(options) // 리졸버가 함수인 경우 실행하여 결과 반환
  }
  return resolver // 리졸버가 값인 경우 그대로 반환
}

/**
 * 요청에 사용할 헤더를 생성합니다.
 * @param config - OpenAPI 설정 객체
 * @param options - API 요청 옵션
 * @returns 생성된 헤더 객체
 */
export const getHeaders = async (
  config: OpenAPIConfig,
  options: ApiRequestOptions
): Promise<Record<string, string>> => {
  // 토큰, 사용자 이름, 비밀번호, 추가 헤더를 비동기로 모두 가져옴
  const [token, username, password, additionalHeaders] = await Promise.all([
    resolve(options, config.TOKEN),
    resolve(options, config.USERNAME),
    resolve(options, config.PASSWORD),
    resolve(options, config.HEADERS),
  ])

  // 기본 헤더와 추가 헤더를 결합
  const headers = Object.entries({
    Accept: 'application/json',
    ...additionalHeaders,
    ...options.headers,
  })
    .filter(([, value]) => value !== undefined && value !== null)
    .reduce(
      (headers, [key, value]) => ({
        ...headers,
        [key]: String(value),
      }),
      {} as Record<string, string>
    )

  // 토큰이 있는 경우 Authorization 헤더 추가
  if (isStringWithValue(token)) {
    // eslint-disable-next-line dot-notation
    headers['Authorization'] = `bearer ${token}`
  }

  // 사용자 이름과 비밀번호가 있는 경우 Basic Authorization 헤더 추가
  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`)
    // eslint-disable-next-line dot-notation
    headers['Authorization'] = `Basic ${credentials}`
  }

  // 요청 본문에 따라 Content-Type 헤더 설정
  if (options.body !== undefined) {
    if (options.mediaType) {
      headers['Content-Type'] = options.mediaType
    } else if (isBlob(options.body)) {
      headers['Content-Type'] = options.body.type || 'application/octet-stream'
    } else if (isString(options.body)) {
      headers['Content-Type'] = 'text/plain'
    } else if (!isFormData(options.body)) {
      headers['Content-Type'] = 'application/json'
    }
  } else if (options.formData !== undefined) {
    if (options.mediaType) {
      headers['Content-Type'] = options.mediaType
    }
  }

  return headers
}

/**
 * 요청 본문을 생성합니다.
 * @param options - API 요청 옵션
 * @returns 요청 본문
 */
export const getRequestBody = (options: ApiRequestOptions): unknown => {
  if (options.body) {
    return options.body
  }
  return undefined
}

/**
 * Axios를 사용하여 실제 HTTP 요청을 전송합니다.
 * @param config - OpenAPI 설정 객체
 * @param options - API 요청 옵션
 * @param url - 요청 URL
 * @param body - 요청 본문
 * @param formData - 요청 FormData
 * @param headers - 요청 헤더
 * @param onCancel - 요청 취소 핸들러
 * @param axiosClient - Axios 인스턴스
 * @returns Axios 응답 객체
 */
export const sendRequest = async <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  url: string,
  body: unknown,
  formData: FormData | undefined,
  headers: Record<string, string>,
  onCancel: OnCancel,
  axiosClient: AxiosInstance
): Promise<AxiosResponse<T>> => {
  const controller = new AbortController() // 요청을 취소할 수 있는 AbortController 생성

  let requestConfig: AxiosRequestConfig = {
    data: body ?? formData, // 본문 또는 FormData 설정
    headers,
    method: options.method,
    signal: controller.signal, // 취소 신호 설정
    url,
    withCredentials: config.WITH_CREDENTIALS,
  }

  onCancel(() => controller.abort()) // 요청이 취소될 때 AbortController를 통해 취소

  for (const fn of config.interceptors.request._fns) {
    requestConfig = await fn(requestConfig) // 요청 인터셉터 적용
  }

  try {
    return await axiosClient.request(requestConfig) // 요청 전송
  } catch (error) {
    const axiosError = error as AxiosError<T>
    if (axiosError.response) {
      return axiosError.response // 응답이 있는 경우 반환
    }
    throw error // 응답이 없는 경우 에러 던짐
  }
}

/**
 * 응답 헤더를 반환합니다.
 * @param response - Axios 응답 객체
 * @param responseHeader - 응답 헤더 이름
 * @returns 응답 헤더 값 또는 undefined
 */
export const getResponseHeader = (
  response: AxiosResponse<unknown>,
  responseHeader?: string
): string | undefined => {
  if (responseHeader) {
    const content = response.headers[responseHeader]
    if (isString(content)) {
      return content
    }
  }
  return undefined
}

/**
 * 응답 본문을 반환합니다.
 * @param response - Axios 응답 객체
 * @returns 응답 본문
 */
export const getResponseBody = (response: AxiosResponse<unknown>): unknown => {
  if (response.status !== 204) {
    return response.data
  }
  return undefined
}

/**
 * HTTP 상태 코드에 따른 에러를 처리합니다.
 * @param options - API 요청 옵션
 * @param result - API 결과
 * @throws ApiError
 */
export const catchErrorCodes = (options: ApiRequestOptions, result: ApiResult): void => {
  const errors: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'Im a teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Content',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required',
    ...options.errors,
  }

  const error = errors[result.status]
  if (error) {
    throw new ApiError(options, result, error)
  }

  if (!result.ok) {
    const errorStatus = result.status ?? 'unknown'
    const errorStatusText = result.statusText ?? 'unknown'
    const errorBody = (() => {
      try {
        return JSON.stringify(result.body, null, 2)
      } catch (e) {
        return undefined
      }
    })()

    throw new ApiError(
      options,
      result,
      `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`
    )
  }
}

/**
 * API 요청을 수행합니다.
 * @param config - OpenAPIConfig
 * @param options - ApiRequestOptions
 * @param axiosClient - AxiosInstance (기본값: axios)
 * @returns 취소 가능한 프로미스
 * @throws ApiError
 */
export const request = <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  axiosClient: AxiosInstance = axios
): CancelablePromise<T> => {
  return new CancelablePromise(async (resolve, reject, onCancel) => {
    try {
      const url = getUrl(config, options) // URL 생성
      const formData = getFormData(options) // FomrData 생성
      const body = getRequestBody(options) // Body 생성
      const headers = await getHeaders(config, options) // Header 생성

      // 요청이 취소되지 않은 경우에만 실행
      if (!onCancel.isCancelled) {
        // 실제 HTTP 요청을 전송하고 응답을 받음
        let response = await sendRequest<T>(
          config,
          options,
          url,
          body,
          formData,
          headers,
          onCancel,
          axiosClient
        )

        // 응답 인터셉터를 적용
        for (const fn of config.interceptors.response._fns) {
          response = await fn(response)
        }

        const responseBody = getResponseBody(response) // 응답 본문을 추출
        const responseHeader = getResponseHeader(response, options.responseHeader) // 요청한 응답 헤더를 추출

        // API 결과 객체를 생성
        const result: ApiResult = {
          url,
          ok: isSuccess(response.status),
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? (responseBody as T),
        }

        catchErrorCodes(options, result) // HTTP 상태 코드에 따라 에러를 처리

        resolve(result.body as T) // Promise를 성공적으로 해결
      }
    } catch (error) {
      reject(error) // Promise를 거부하여 에러 처리
    }
  })
}
