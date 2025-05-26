import { createAction } from '@reduxjs/toolkit'

// TYPES & CONSTANTS
import { ScanDocumentsFilters } from 'src/documents/types'

export const ScanDocumentActionTypes = {
  SET_SCAN_DOCUMENT_FILTERS: 'SCAN_DOCUMENT_FILTER.SET_SCAN_DOCUMENT_FILTERS',
} as const

const setScanDocumentFilters = createAction(
  ScanDocumentActionTypes.SET_SCAN_DOCUMENT_FILTERS,
  (filters: ScanDocumentsFilters) => ({
    payload: {
      filters,
    },
  })
)

export const actions = {
  setScanDocumentFilters,
}
