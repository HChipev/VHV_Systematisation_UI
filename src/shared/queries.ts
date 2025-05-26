import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import {
  SavedDocumentRequestQuery,
  ScannedDocumentRequestQuery,
} from 'src/documents/types'

// UTILS
import { apiCalls } from 'src/shared/apiCalls'

// TYPES & CONSTANTS
import {
  SAVED_DOCUMENTS_QUERY_KEY,
  SCANNED_DOCUMENTS_QUERY_KEY,
} from 'src/shared/queryKeys'

// ROLES
export const useUserRoles = () =>
  useQuery({
    queryKey: ['userRoles'],
    queryFn: apiCalls.getUserRoles,
  })

// DOCUMENTS
export const useScannedDocuments = (
  paginationQuery: ScannedDocumentRequestQuery
) =>
  useSuspenseQuery({
    queryKey: [SCANNED_DOCUMENTS_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getScannedDocuments(paginationQuery),
  })

export const useSavedDocuments = (paginationQuery: SavedDocumentRequestQuery) =>
  useSuspenseQuery({
    queryKey: [SAVED_DOCUMENTS_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getSavedDocuments(paginationQuery),
  })

// TYPES
export const useDocumentTypes = () =>
  useSuspenseQuery({
    queryKey: ['documentTypes'],
    queryFn: apiCalls.getDocumentTypes,
  })

export const useDescriptionTypes = () =>
  useSuspenseQuery({
    queryKey: ['descriptionTypes'],
    queryFn: apiCalls.getDescriptionTypes,
  })

export const useExpenseTypes = () =>
  useSuspenseQuery({
    queryKey: ['expenseTypes'],
    queryFn: apiCalls.getExpenseTypes,
  })

export const usePaymentTypes = () =>
  useSuspenseQuery({
    queryKey: ['paymentTypes'],
    queryFn: apiCalls.getPaymentTypes,
  })

export const useVehicles = () =>
  useSuspenseQuery({
    queryKey: ['vehicles'],
    queryFn: apiCalls.getVehicles,
  })

export const useOffices = () =>
  useSuspenseQuery({
    queryKey: ['offices'],
    queryFn: apiCalls.getOffices,
  })
