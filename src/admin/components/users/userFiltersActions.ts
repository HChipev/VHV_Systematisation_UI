import { createAction } from '@reduxjs/toolkit'

// TYPES & CONSTANTS
import { UserFilters } from 'src/admin/types'

export const userFiltersActionTypes = {
  SET_USER_FILTERS: 'USER_FILTER.SET_USER_FILTERS',
} as const

const setUserFilters = createAction(
  userFiltersActionTypes.SET_USER_FILTERS,
  (filters: UserFilters) => ({
    payload: {
      filters,
    },
  })
)

export const actions = {
  setUserFilters,
}
