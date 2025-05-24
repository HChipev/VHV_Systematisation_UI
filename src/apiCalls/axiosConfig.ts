import axios, { AxiosRequestConfig } from 'axios'

// CONSTANTS
import { SESSION_STORAGE_TOKEN_KEY } from 'src/shared/constants'

const caller = axios.create({
  baseURL: import.meta.env.VITE_VHV_API_URL,
})

caller.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY)

  config.headers.Authorization = `Bearer ${token}`

  return config
})

export const call = <ResponseType>(params: AxiosRequestConfig) =>
  caller.request<ResponseType>(params)
