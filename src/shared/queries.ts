import { useQuery } from '@tanstack/react-query'
import { ResourceTypeRequestQuery } from 'src/admin/components/types/types'
import { UserRequestQuery } from 'src/admin/types'
import {
  SavedDocumentRequestQuery,
  ScannedDocumentRequestQuery,
} from 'src/documents/types'

// UTILS
import { apiCalls } from 'src/shared/apiCalls'

// TYPES & CONSTANTS
import {
  PAGINATED_DESCRIPTION_TYPES_QUERY_KEY,
  PAGINATED_DOCUMENT_TYPES_QUERY_KEY,
  PAGINATED_EXPENSE_TYPES_QUERY_KEY,
  PAGINATED_OFFICES_QUERY_KEY,
  PAGINATED_PAYMENT_TYPES_QUERY_KEY,
  PAGINATED_VEHICLES_QUERY_KEY,
  SAVED_DOCUMENTS_QUERY_KEY,
  SCAN_PATH_QUERY_KEY,
  SCANNED_DOCUMENTS_QUERY_KEY,
  USERS_QUERY_KEY,
} from 'src/shared/queryKeys'

// USERS & ROLES
export const useUserRoles = () =>
  useQuery({
    queryKey: ['userRoles'],
    queryFn: apiCalls.getUserRoles,
  })

export const useUsers = (paginationQuery: UserRequestQuery) =>
  useQuery({
    queryKey: [USERS_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getUsers(paginationQuery),
  })

// AUTHENTICATION
export const useRoles = () =>
  useQuery({
    queryKey: ['roles'],
    queryFn: apiCalls.getRoles,
  })

// DOCUMENTS
export const useScannedDocuments = (
  paginationQuery: ScannedDocumentRequestQuery
) =>
  useQuery({
    queryKey: [SCANNED_DOCUMENTS_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getScannedDocuments(paginationQuery),
  })

export const useSavedDocuments = (paginationQuery: SavedDocumentRequestQuery) =>
  useQuery({
    queryKey: [SAVED_DOCUMENTS_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getSavedDocuments(paginationQuery),
  })

// TYPES
export const useDocumentTypes = () =>
  useQuery({
    queryKey: ['documentTypes'],
    queryFn: apiCalls.getDocumentTypes,
  })

export const useDescriptionTypes = () =>
  useQuery({
    queryKey: ['descriptionTypes'],
    queryFn: apiCalls.getDescriptionTypes,
  })

export const useExpenseTypes = () =>
  useQuery({
    queryKey: ['expenseTypes'],
    queryFn: apiCalls.getExpenseTypes,
  })

export const usePaymentTypes = () =>
  useQuery({
    queryKey: ['paymentTypes'],
    queryFn: apiCalls.getPaymentTypes,
  })

export const useVehicles = () =>
  useQuery({
    queryKey: ['vehicles'],
    queryFn: apiCalls.getVehicles,
  })

export const useOffices = () =>
  useQuery({
    queryKey: ['offices'],
    queryFn: apiCalls.getOffices,
  })

export const usePaginatedDocumentTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: [PAGINATED_DOCUMENT_TYPES_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getPaginatedDocumentTypes(paginationQuery),
  })

export const usePaginatedDescriptionTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: [PAGINATED_DESCRIPTION_TYPES_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getPaginatedDescriptionTypes(paginationQuery),
  })

export const usePaginatedExpenseTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: [PAGINATED_EXPENSE_TYPES_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getPaginatedExpenseTypes(paginationQuery),
  })

export const usePaginatedPaymentTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: [PAGINATED_PAYMENT_TYPES_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getPaginatedPaymentTypes(paginationQuery),
  })

export const usePaginatedVehicles = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: [PAGINATED_VEHICLES_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getPaginatedVehicles(paginationQuery),
  })

export const usePaginatedOffices = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: [PAGINATED_OFFICES_QUERY_KEY, paginationQuery],
    queryFn: () => apiCalls.getPaginatedOffices(paginationQuery),
  })

// HEALTHCHECK
export const useHealthcheck = () =>
  useQuery({
    queryKey: ['healthcheck'],
    queryFn: apiCalls.getHealthcheck,
    throwOnError: false,
  })

// SCAN PATHS
export const useScanPath = () =>
  useQuery({
    queryKey: [SCAN_PATH_QUERY_KEY],
    queryFn: apiCalls.getScanPath,
  })
