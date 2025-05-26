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
} from 'src/shared/types'
import { createQueryString } from 'src/shared/apiCallsUtils'

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
}
