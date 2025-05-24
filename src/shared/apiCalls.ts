// UTILS
import { call } from 'src/apiCalls/axiosConfig'

// TYPES
import { LoginRequest, TokenResponse } from 'src/authentication/types'

// AUTHENTICATION
const login = (data: LoginRequest) =>
  call<TokenResponse>({
    url: '/authentication/login',
    method: 'POST',
    data,
  }).then((response) => response.data)

const logout = () =>
  call({
    url: '/authentication/logout',
    method: 'GET',
  }).then((response) => response.data)

export const apiCalls = {
  login,
  logout,
}
