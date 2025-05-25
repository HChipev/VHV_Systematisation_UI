import * as React from 'react'
import { enqueueSnackbar } from 'notistack'

// TYPES & CONSTANTS
import { AxiosError } from 'axios'
import { ApiError, PaginationRequest, Roles } from 'src/shared/types'
import { PAGE_SIZE_OPTIONS } from 'src/shared/constants'

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

export const isValidDate = (date: unknown) =>
  date instanceof Date && !isNaN(date.getTime())

export const usePagination = () =>
  React.useState<PaginationRequest>({
    page: 1,
    pageSize: PAGE_SIZE_OPTIONS[0],
  })
