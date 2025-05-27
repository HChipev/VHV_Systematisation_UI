// UTILS
import { call } from 'src/apiCalls/axiosConfig'

// TYPES
import { LoginRequest, TokenResponse } from 'src/authentication/types'
import {
  ResourceTypeResponse,
  SavedDocumentRequest,
  SavedDocumentRequestQuery,
  SavedDocumentsResponse,
  ScannedDocumentRequestQuery,
  ScannedDocumentsResponse,
} from 'src/documents/types'
import {
  PaginatedResponse,
  PaginationMetadataBase,
  Roles,
  User,
} from 'src/shared/types'
import { createQueryString } from 'src/shared/apiCallsUtils'
import { UserRequestQuery } from 'src/admin/types'
import { ResourceTypeRequestQuery } from 'src/admin/components/types/types'

// AUTHENTICATION
const login = (data: LoginRequest) =>
  call<TokenResponse>({
    url: '/authentication/login',
    method: 'POST',
    data,
  }).then((response) => response.data)

const logout = () =>
  call({
    url: '/authentication/logout',
    method: 'GET',
  }).then((response) => response.data)

const getUserRoles = () =>
  call<Roles[]>({
    url: '/authentication/user/roles',
    method: 'GET',
  }).then((response) => response.data)

const getUsers = (paginationQuery: UserRequestQuery) =>
  call<PaginatedResponse<User, PaginationMetadataBase>>({
    url: `/authentication/users${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const getRoles = () =>
  call<Roles[]>({
    url: '/authentication/roles',
    method: 'GET',
  }).then((response) => response.data)

//DOCUMENTS
const getScannedDocuments = (paginationQuery: ScannedDocumentRequestQuery) =>
  call<PaginatedResponse<ScannedDocumentsResponse, PaginationMetadataBase>>({
    url: `/documents/scanned${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const getSavedDocuments = (paginationQuery: SavedDocumentRequestQuery) =>
  call<PaginatedResponse<SavedDocumentsResponse, PaginationMetadataBase>>({
    url: `/documents/saved${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const addSavedDocument = (data: SavedDocumentRequest) =>
  call<void>({
    url: '/documents/saved',
    method: 'POST',
    data,
  }).then((response) => response.data)

//TYPES
const getDocumentTypes = () =>
  call<ResourceTypeResponse>({
    url: '/document-types',
    method: 'GET',
  }).then((response) => response.data)

const getDescriptionTypes = () =>
  call<ResourceTypeResponse>({
    url: '/description-types',
    method: 'GET',
  }).then((response) => response.data)

const getExpenseTypes = () =>
  call<ResourceTypeResponse>({
    url: '/expense-types',
    method: 'GET',
  }).then((response) => response.data)

const getOffices = () =>
  call<ResourceTypeResponse>({
    url: '/offices',
    method: 'GET',
  }).then((response) => response.data)

const getVehicles = () =>
  call<ResourceTypeResponse>({
    url: '/vehicles',
    method: 'GET',
  }).then((response) => response.data)

const getPaymentTypes = () =>
  call<ResourceTypeResponse>({
    url: '/payment-types',
    method: 'GET',
  }).then((response) => response.data)

const getPaginatedDocumentTypes = (paginationQuery: ResourceTypeRequestQuery) =>
  call<PaginatedResponse<ResourceTypeResponse, PaginationMetadataBase>>({
    url: `/document-types/paginated${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const getPaginatedDescriptionTypes = (
  paginationQuery: ResourceTypeRequestQuery
) =>
  call<PaginatedResponse<ResourceTypeResponse, PaginationMetadataBase>>({
    url: `/description-types/paginated${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const getPaginatedExpenseTypes = (paginationQuery: ResourceTypeRequestQuery) =>
  call<PaginatedResponse<ResourceTypeResponse, PaginationMetadataBase>>({
    url: `/expense-types/paginated${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const getPaginatedOffices = (paginationQuery: ResourceTypeRequestQuery) =>
  call<PaginatedResponse<ResourceTypeResponse, PaginationMetadataBase>>({
    url: `/offices/paginated${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const getPaginatedVehicles = (paginationQuery: ResourceTypeRequestQuery) =>
  call<PaginatedResponse<ResourceTypeResponse, PaginationMetadataBase>>({
    url: `/vehicles/paginated${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const getPaginatedPaymentTypes = (paginationQuery: ResourceTypeRequestQuery) =>
  call<PaginatedResponse<ResourceTypeResponse, PaginationMetadataBase>>({
    url: `/payment-types/paginated${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

// HEALTHCHECK
const getHealthcheck = () =>
  call({
    url: '/healthcheck',
    method: 'GET',
  }).then((response) => response.data)

export const apiCalls = {
  login,
  logout,
  getUserRoles,
  getScannedDocuments,
  getSavedDocuments,
  getDocumentTypes,
  getDescriptionTypes,
  getExpenseTypes,
  getOffices,
  getVehicles,
  getPaymentTypes,
  addSavedDocument,
  getHealthcheck,
  getUsers,
  getRoles,
  getPaginatedDocumentTypes,
  getPaginatedDescriptionTypes,
  getPaginatedExpenseTypes,
  getPaginatedOffices,
  getPaginatedVehicles,
  getPaginatedPaymentTypes,
}
