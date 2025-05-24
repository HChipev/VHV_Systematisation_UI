import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

// CONSTANTS
import { SESSION_STORAGE_TOKEN_KEY } from 'src/shared/constants'
import { ROUTES } from 'src/shared/routes'

interface PrivateRouteProps {
  Component: React.FC
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
  const token = sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY)

  const isTokenExpired = (jwtToken: string | null): boolean => {
    if (!jwtToken) {
      return true
    }

    const payload = jwtDecode<{ exp?: number }>(jwtToken)

    if (!payload || !payload.exp) {
      return true
    }

    const now = Math.floor(Date.now() / 1000)
    return payload.exp < now
  }

  if (isTokenExpired(token)) {
    sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY)
  }

  return token ? <Component /> : <Navigate to={ROUTES.LOGIN_ROUTE} />
}
