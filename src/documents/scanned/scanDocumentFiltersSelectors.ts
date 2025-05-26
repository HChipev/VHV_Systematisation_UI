import { createSelector } from '@reduxjs/toolkit'

// UTILS
import { StoreState } from 'src/redux/store'

const getScanDocumentFiltersState = (state: StoreState) =>
  state.scanDocumentFilters

export const getScanDocumentFilters = createSelector(
  getScanDocumentFiltersState,
  (scanDocumentFiltersState) => scanDocumentFiltersState.filters
)
