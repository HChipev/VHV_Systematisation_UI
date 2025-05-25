import { useMutation } from '@tanstack/react-query'

// UTILS
import { apiCalls } from 'src/shared/apiCalls'

// TYPES & CONSTANTS
import { LoginRequest } from 'src/authentication/types'
import { SavedDocumentRequest } from 'src/documents/types'

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

// DOCUMENTS
export const useAddSavedDocument = () =>
  useMutation({
    mutationKey: ['addSavedDocuments'],
    mutationFn: (data: SavedDocumentRequest) => apiCalls.addSavedDocument(data),
  })
