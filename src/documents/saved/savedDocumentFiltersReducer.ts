import { createReducer } from '@reduxjs/toolkit'

// ACTIONS
import { actions } from 'src/documents/saved/savedDocumentFiltersActions'

// TYPES & CONSTANTS
import { SavedDocumentFilters } from 'src/documents/types'

export interface SavedDocumentFilterState {
  filters: SavedDocumentFilters
}

export const initialState: SavedDocumentFilterState = {
  filters: {},
}

type SetSavedDocumentFiltersAction = ReturnType<
  typeof actions.setSavedDocumentFilters
>

const setSavedDocumentFiltersTransformer = (
  state: SavedDocumentFilterState,
  action: SetSavedDocumentFiltersAction
) => {
  const {
    payload: { filters },
  } = action

  state.filters = filters
}

export const savedDocumentFiltersReducer = createReducer(
  initialState,
  (builder) =>
    builder.addCase(
      actions.setSavedDocumentFilters,
      setSavedDocumentFiltersTransformer
    )
)
