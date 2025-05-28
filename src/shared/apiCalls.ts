// UTILS
import { call } from 'src/apiCalls/axiosConfig'

// TYPES
import { LoginRequest, TokenResponse } from 'src/authentication/types'
import {
  ResourceTypeResponse,
  SavedDocument,
  SavedDocumentRequest,
  SavedDocumentRequestQuery,
  ScannedDocument,
  ScannedDocumentRequestQuery,
} from 'src/documents/types'
import {
  PaginatedResponse,
  PaginationMetadataBase,
  Roles,
  User,
} from 'src/shared/types'
import { createQueryString } from 'src/shared/apiCallsUtils'
import { UserRequestQuery } from 'src/admin/types'
import {
  ResourceTypeModelRequest,
  ResourceTypeRequestQuery,
} from 'src/admin/components/types/types'
import {
  AddUserRequest,
  UpdateUserRequest,
} from 'src/admin/components/users/types'

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

const getRoles = () =>
  call<Roles[]>({
    url: '/authentication/roles',
    method: 'GET',
  }).then((response) => response.data)

// USER & ROLES
const getUserRoles = () =>
  call<Roles[]>({
    url: '/user/roles',
    method: 'GET',
  }).then((response) => response.data)

const getUsers = (paginationQuery: UserRequestQuery) =>
  call<PaginatedResponse<User, PaginationMetadataBase>>({
    url: `/users${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const addUser = (data: AddUserRequest) =>
  call<void>({
    url: '/users',
    method: 'POST',
    data,
  }).then((response) => response.data)

const updateUser = (id: number, data: UpdateUserRequest) =>
  call<void>({
    url: `/users/${id}`,
    method: 'PUT',
    data,
  }).then((response) => response.data)

const deleteUser = (id: number) =>
  call<void>({
    url: `/users/${id}`,
    method: 'DELETE',
  }).then((response) => response.data)

//DOCUMENTS
const getScannedDocuments = (paginationQuery: ScannedDocumentRequestQuery) =>
  call<PaginatedResponse<ScannedDocument, PaginationMetadataBase>>({
    url: `/documents/scanned${createQueryString(paginationQuery)}`,
    method: 'GET',
  }).then((response) => response.data)

const getSavedDocuments = (paginationQuery: SavedDocumentRequestQuery) =>
  call<PaginatedResponse<SavedDocument, PaginationMetadataBase>>({
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

const addDocumentType = (data: ResourceTypeModelRequest) =>
  call<void>({
    url: '/document-types',
    method: 'POST',
    data,
  }).then((response) => response.data)

const addDescriptionType = (data: ResourceTypeModelRequest) =>
  call<void>({
    url: '/description-types',
    method: 'POST',
    data,
  }).then((response) => response.data)

const addExpenseType = (data: ResourceTypeModelRequest) =>
  call<void>({
    url: '/expense-types',
    method: 'POST',
    data,
  }).then((response) => response.data)

const addOffice = (data: ResourceTypeModelRequest) =>
  call<void>({
    url: '/offices',
    method: 'POST',
    data,
  }).then((response) => response.data)

const addVehicle = (data: ResourceTypeModelRequest) =>
  call<void>({
    url: '/vehicles',
    method: 'POST',
    data,
  }).then((response) => response.data)

const addPaymentType = (data: ResourceTypeModelRequest) =>
  call<void>({
    url: '/payment-types',
    method: 'POST',
    data,
  }).then((response) => response.data)

const updateDocumentType = (id: number, data: ResourceTypeModelRequest) =>
  call<void>({
    url: `/document-types/${id}`,
    method: 'PUT',
    data,
  }).then((response) => response.data)

const updateDescriptionType = (id: number, data: ResourceTypeModelRequest) =>
  call<void>({
    url: `/description-types/${id}`,
    method: 'PUT',
    data,
  }).then((response) => response.data)

const updateExpenseType = (id: number, data: ResourceTypeModelRequest) =>
  call<void>({
    url: `/expense-types/${id}`,
    method: 'PUT',
    data,
  }).then((response) => response.data)

const updateOffice = (id: number, data: ResourceTypeModelRequest) =>
  call<void>({
    url: `/offices/${id}`,
    method: 'PUT',
    data,
  }).then((response) => response.data)

const updateVehicle = (id: number, data: ResourceTypeModelRequest) =>
  call<void>({
    url: `/vehicles/${id}`,
    method: 'PUT',
    data,
  }).then((response) => response.data)

const updatePaymentType = (id: number, data: ResourceTypeModelRequest) =>
  call<void>({
    url: `/payment-types/${id}`,
    method: 'PUT',
    data,
  }).then((response) => response.data)

const deleteDocumentType = (id: number) =>
  call<void>({
    url: `/document-types/${id}`,
    method: 'DELETE',
  }).then((response) => response.data)

const deleteDescriptionType = (id: number) =>
  call<void>({
    url: `/description-types/${id}`,
    method: 'DELETE',
  }).then((response) => response.data)

const deleteExpenseType = (id: number) =>
  call<void>({
    url: `/expense-types/${id}`,
    method: 'DELETE',
  }).then((response) => response.data)

const deleteOffice = (id: number) =>
  call<void>({
    url: `/offices/${id}`,
    method: 'DELETE',
  }).then((response) => response.data)

const deleteVehicle = (id: number) =>
  call<void>({
    url: `/vehicles/${id}`,
    method: 'DELETE',
  }).then((response) => response.data)

const deletePaymentType = (id: number) =>
  call<void>({
    url: `/payment-types/${id}`,
    method: 'DELETE',
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
  addDocumentType,
  addDescriptionType,
  addExpenseType,
  addOffice,
  addVehicle,
  addPaymentType,
  addUser,
  updateDocumentType,
  updateDescriptionType,
  updateExpenseType,
  updateOffice,
  updateVehicle,
  updatePaymentType,
  deleteDocumentType,
  deleteDescriptionType,
  deleteExpenseType,
  deleteOffice,
  deleteVehicle,
  deletePaymentType,
  updateUser,
  deleteUser,
}
