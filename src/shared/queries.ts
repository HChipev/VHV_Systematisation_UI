import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
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
  SAVED_DOCUMENTS_QUERY_KEY,
  SCANNED_DOCUMENTS_QUERY_KEY,
} from 'src/shared/queryKeys'

// ROLES
export const useUserRoles = () =>
  useQuery({
    queryKey: ['userRoles'],
    queryFn: apiCalls.getUserRoles,
  })

export const useUsers = (paginationQuery: UserRequestQuery) =>
  useSuspenseQuery({
    queryKey: ['users', paginationQuery],
    queryFn: () => apiCalls.getUsers(paginationQuery),
  })

export const useRoles = () =>
  useQuery({
    queryKey: ['roles'],
    queryFn: apiCalls.getRoles,
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

export const usePaginatedDocumentTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: ['paginatedDocumentTypes'],
    queryFn: () => apiCalls.getPaginatedDocumentTypes(paginationQuery),
  })

export const usePaginatedDescriptionTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: ['paginatedDescriptionTypes'],
    queryFn: () => apiCalls.getPaginatedDescriptionTypes(paginationQuery),
  })

export const usePaginatedExpenseTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: ['paginatedExpenseTypes'],
    queryFn: () => apiCalls.getPaginatedExpenseTypes(paginationQuery),
  })

export const usePaginatedPaymentTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: ['paginatedPaymentTypes'],
    queryFn: () => apiCalls.getPaginatedPaymentTypes(paginationQuery),
  })

export const usePaginatedVehicles = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: ['paginatedVehicles'],
    queryFn: () => apiCalls.getPaginatedVehicles(paginationQuery),
  })

export const usePaginatedOffices = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  useQuery({
    queryKey: ['paginatedOffices'],
    queryFn: () => apiCalls.getPaginatedOffices(paginationQuery),
  })

// HEALTHCHECK
export const useHealthcheck = () =>
  useQuery({
    queryKey: ['healthcheck'],
    queryFn: apiCalls.getHealthcheck,
    throwOnError: false,
  })
