import { useMutation } from '@tanstack/react-query'

// UTILS
import { apiCalls } from 'src/shared/apiCalls'

// TYPES
import { LoginRequest } from 'src/authentication/types'

// AUTHENTICATION
export const useLogin = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginRequest) => apiCalls.login(data),
  })

export const useLogout = () =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: () => apiCalls.logout(),
  })
