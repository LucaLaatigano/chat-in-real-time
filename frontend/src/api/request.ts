import { ApiError } from "../error/apiError.ts"
import type { BackErrorResponse } from "../types/optionsRequestType"
const BASE_URL = import.meta.env.VITE_BASE_URL ?? ''
const API_KEY = import.meta.env.VITE_API_KEY ?? ''


export const request = async<T = unknown>(path: string, options: RequestInit = {}) => {
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData
  const defaultHeaders = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(API_KEY ? { 'x-api-key': API_KEY } : {})
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    }
  })

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as BackErrorResponse | null
    const message = errorData?.message ?? `Error en la petición: ${res.statusText}`
    const errorType = errorData?.error ?? "UnknownError"
    throw new ApiError(message, res.status, errorType)
  }

  if (res.status === 204) {
    return null as T
  }

  const data = (await res.json()) as T
  return data
}

