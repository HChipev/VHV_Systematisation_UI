import { createAction } from '@reduxjs/toolkit'

// TYPES & CONSTANTS
import { SavedDocumentFilters } from 'src/documents/types'

export const SavedDocumentActionTypes = {
  SET_SAVED_DOCUMENT_FILTERS:
    'SAVED_DOCUMENT_FILTER.SAVED_SCAN_DOCUMENT_FILTERS',
} as const

const setSavedDocumentFilters = createAction(
  SavedDocumentActionTypes.SET_SAVED_DOCUMENT_FILTERS,
  (filters: SavedDocumentFilters) => ({
    payload: {
      filters,
    },
  })
)

export const actions = {
  setSavedDocumentFilters,
}
