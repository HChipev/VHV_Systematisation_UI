import { useMutation } from '@tanstack/react-query'

// UTILS
import { apiCalls } from 'src/shared/apiCalls'

// TYPES & CONSTANTS
import { LoginRequest } from 'src/authentication/types'
import { DocumentRequest } from 'src/documents/types'
import { ResourceTypeModelRequest } from 'src/admin/components/types/types'
import {
  AddUserRequest,
  UpdateUserRequest,
} from 'src/admin/components/users/types'
import { ScanPath } from 'src/admin/types'

// AUTHENTICATION
export const useLogin = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginRequest) => apiCalls.login(data),
  })

export const useLogout = () =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: () => apiCalls.logout(),
  })

//USER & ROLES
export const useAddUser = () =>
  useMutation({
    mutationKey: ['addUser'],
    mutationFn: (data: AddUserRequest) => apiCalls.addUser(data),
  })

export const useUpdateUser = () =>
  useMutation({
    mutationKey: ['updateUser'],
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
      apiCalls.updateUser(id, data),
  })

export const useDeleteUser = () =>
  useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: (id: number) => apiCalls.deleteUser(id),
  })

// DOCUMENTS
export const useAddSavedDocument = () =>
  useMutation({
    mutationKey: ['addSavedDocuments'],
    mutationFn: (data: DocumentRequest) => apiCalls.addSavedDocument(data),
  })

export const useUpdateSavedDocument = () =>
  useMutation({
    mutationKey: ['updateSavedDocument'],
    mutationFn: ({ id, data }: { id: number; data: DocumentRequest }) =>
      apiCalls.updateSavedDocument(id, data),
  })

// TYPES
export const useAddDocumentType = () =>
  useMutation({
    mutationKey: ['addDocumentType'],
    mutationFn: (data: ResourceTypeModelRequest) =>
      apiCalls.addDocumentType(data),
  })

export const useAddDescriptionType = () =>
  useMutation({
    mutationKey: ['addDescriptionType'],
    mutationFn: (data: ResourceTypeModelRequest) =>
      apiCalls.addDescriptionType(data),
  })

export const useAddExpenseType = () =>
  useMutation({
    mutationKey: ['addExpenseType'],
    mutationFn: (data: ResourceTypeModelRequest) =>
      apiCalls.addExpenseType(data),
  })

export const useAddOffice = () =>
  useMutation({
    mutationKey: ['addOffice'],
    mutationFn: (data: ResourceTypeModelRequest) => apiCalls.addOffice(data),
  })

export const useAddVehicle = () =>
  useMutation({
    mutationKey: ['addVehicle'],
    mutationFn: (data: ResourceTypeModelRequest) => apiCalls.addVehicle(data),
  })

export const useAddPaymentType = () =>
  useMutation({
    mutationKey: ['addPaymentType'],
    mutationFn: (data: ResourceTypeModelRequest) =>
      apiCalls.addPaymentType(data),
  })

export const useUpdateDocumentType = () =>
  useMutation({
    mutationKey: ['updateDocumentType'],
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: ResourceTypeModelRequest
    }) => apiCalls.updateDocumentType(id, data),
  })

export const useUpdateDescriptionType = () =>
  useMutation({
    mutationKey: ['updateDescriptionType'],
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: ResourceTypeModelRequest
    }) => apiCalls.updateDescriptionType(id, data),
  })

export const useUpdateExpenseType = () =>
  useMutation({
    mutationKey: ['updateExpenseType'],
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: ResourceTypeModelRequest
    }) => apiCalls.updateExpenseType(id, data),
  })

export const useUpdateOffice = () =>
  useMutation({
    mutationKey: ['updateOffice'],
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: ResourceTypeModelRequest
    }) => apiCalls.updateOffice(id, data),
  })

export const useUpdateVehicle = () =>
  useMutation({
    mutationKey: ['updateVehicle'],
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: ResourceTypeModelRequest
    }) => apiCalls.updateVehicle(id, data),
  })

export const useUpdatePaymentType = () =>
  useMutation({
    mutationKey: ['updatePaymentType'],
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: ResourceTypeModelRequest
    }) => apiCalls.updatePaymentType(id, data),
  })

export const useDeleteDocumentType = () =>
  useMutation({
    mutationKey: ['deleteDocumentType'],
    mutationFn: (id: number) => apiCalls.deleteDocumentType(id),
  })

export const useDeleteDescriptionType = () =>
  useMutation({
    mutationKey: ['deleteDescriptionType'],
    mutationFn: (id: number) => apiCalls.deleteDescriptionType(id),
  })

export const useDeleteExpenseType = () =>
  useMutation({
    mutationKey: ['deleteExpenseType'],
    mutationFn: (id: number) => apiCalls.deleteExpenseType(id),
  })

export const useDeleteOffice = () =>
  useMutation({
    mutationKey: ['deleteOffice'],
    mutationFn: (id: number) => apiCalls.deleteOffice(id),
  })

export const useDeleteVehicle = () =>
  useMutation({
    mutationKey: ['deleteVehicle'],
    mutationFn: (id: number) => apiCalls.deleteVehicle(id),
  })

export const useDeletePaymentType = () =>
  useMutation({
    mutationKey: ['deletePaymentType'],
    mutationFn: (id: number) => apiCalls.deletePaymentType(id),
  })

export const useAddEmployee = () =>
  useMutation({
    mutationKey: ['addEmployee'],
    mutationFn: (data: ResourceTypeModelRequest) => apiCalls.addEmployee(data),
  })

export const useUpdateEmployee = () =>
  useMutation({
    mutationKey: ['updateEmployee'],
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: ResourceTypeModelRequest
    }) => apiCalls.updateEmployee(id, data),
  })

export const useDeleteEmployee = () =>
  useMutation({
    mutationKey: ['deleteEmployee'],
    mutationFn: (id: number) => apiCalls.deleteEmployee(id),
  })

// SCAN PATHS
export const useUpdateScanPath = () =>
  useMutation({
    mutationKey: ['scanPath'],
    mutationFn: (data: ScanPath) => apiCalls.updateScanPath(data),
  })
