import { createSelector } from '@reduxjs/toolkit'

// UTILS
import { StoreState } from 'src/redux/store'

const getUserFiltersState = (state: StoreState) => state.userFilters

export const getUserFilters = createSelector(
  getUserFiltersState,
  (userFiltersState) => userFiltersState.filters
)
