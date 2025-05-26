import { createReducer } from '@reduxjs/toolkit'

// ACTIONS
import { actions } from 'src/documents/scanned/scanDocumentFiltersActions'

// TYPES & CONSTANTS
import { ScanDocumentsFilters } from 'src/documents/types'

export interface ScanDocumentFilterState {
  filters: ScanDocumentsFilters
}

export const initialState: ScanDocumentFilterState = {
  filters: {},
}

type SetScanDocumentFiltersAction = ReturnType<
  typeof actions.setScanDocumentFilters
>

const setScanDocumentFiltersTransformer = (
  state: ScanDocumentFilterState,
  action: SetScanDocumentFiltersAction
) => {
  const {
    payload: { filters },
  } = action

  state.filters = filters
}

export const scanDocumentFiltersReducer = createReducer(
  initialState,
  (builder) =>
    builder.addCase(
      actions.setScanDocumentFilters,
      setScanDocumentFiltersTransformer
    )
)
