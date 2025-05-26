import { createSelector } from '@reduxjs/toolkit'

// UTILS
import { StoreState } from 'src/redux/store'

const getSavedDocumentFiltersState = (state: StoreState) =>
  state.savedDocumentFilters

export const getSavedDocumentFilters = createSelector(
  getSavedDocumentFiltersState,
  (savedDocumentFiltersState) => savedDocumentFiltersState.filters
)
