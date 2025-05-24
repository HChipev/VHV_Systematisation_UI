import { enqueueSnackbar } from 'notistack'

// TYPES
import { AxiosError } from 'axios'
import { ApiError, Roles } from 'src/shared/types'

export const hasRole = (requiredRoles: Roles[], userRoles: Roles[]): boolean =>
  requiredRoles.some((role) => userRoles.includes(role))

export const handleApiError = (error: Error) => {
  if (
    error instanceof AxiosError &&
    error.response &&
    Array.isArray(error.response.data)
  ) {
    const data = error.response.data as ApiError[]
    data.forEach((err) => {
      enqueueSnackbar(err.message, {
        variant: 'error',
      })
    })
  }
}
