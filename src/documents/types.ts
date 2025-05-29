// TYPES & CONSTANTS
import { GridSortDirection } from '@mui/x-data-grid'
import { PaginationRequest } from 'src/shared/types'

export enum DocumentTabs {
  ScannedDocuments = 'ScannedDocuments',
  SavedDocuments = 'SavedDocuments',
}

export interface ScannedDocument {
  id: string
  name: string
  creationDateTime: Date
  file: string
}

export interface SavedDocument {
  id: number
  issuedDate: Date
  fileNameDescription: string
  file: string
  documentType: string
  expenseType: string
  vehicle?: string
  office?: string
  periodStartDate?: Date
  periodEndDate?: Date
  documentNumber: string
  price: number
  valueAddedTax: number
  taxBase: number
  paymentType: string
  paymentDate?: Date
  counterpartyName: string
  counterpartyBulstat: string
  descriptionType: string
  description: string
  createdDateTime: Date
  name: string
  employee: string
}

export interface SavedDocumentRequest {
  issuedDate: string
  fileNameDescription: string
  documentTypeId: number
  expenseTypeId: number
  vehicleId?: number
  employeeId?: number
  officeId?: number
  periodStartDate?: string
  periodEndDate?: string
  documentNumber: string
  price: number
  paymentTypeId?: number
  paymentDate?: string
  counterpartyName: string
  counterpartyBulstat?: string
  descriptionTypeId: number
  description: string
  scannedDocumentId: number
}

export interface ResourceType {
  id: number
  name: string
  description: string
}

export type ResourceTypeResponse = ResourceType[]

export interface ScannedDocumentRequestQuery extends PaginationRequest {
  sortBy?: string
  sortDirection?: GridSortDirection
  name?: string
  startCreatedDateTime?: Date
  endCreatedDateTime?: Date
}

export interface SavedDocumentRequestQuery extends PaginationRequest {
  sortBy?: string
  sortDirection?: GridSortDirection
  startCreatedDateTime?: Date
  endCreatedDateTime?: Date
  startIssuedDate?: Date
  endIssuedDate?: Date
  fileNameDescription?: string
  documentType?: string
  expenseType?: string
  vehicle?: string
  office?: string
  startPeriodStartDate?: Date
  endPeriodStartDate?: Date
  startPeriodEndDate?: Date
  endPeriodEndDate?: Date
  documentNumber?: string
  minPrice?: number
  maxPrice?: number
  paymentType?: string
  startPaymentDate?: Date
  endPaymentDate?: Date
  counterpartyName?: string
  counterpartyBulstat?: string
  descriptionType?: string
  description?: string
  employee?: string
}

export interface ScanDocumentsFilters {
  startCreatedDateTime?: Date
  endCreatedDateTime?: Date
  name?: string
}

export interface SavedDocumentFilters {
  startCreatedDateTime?: Date
  endCreatedDateTime?: Date
  startIssuedDate?: Date
  endIssuedDate?: Date
  fileNameDescription?: string
  documentType?: string
  expenseType?: string
  vehicle?: string
  office?: string
  startPeriodStartDate?: Date
  endPeriodStartDate?: Date
  startPeriodEndDate?: Date
  endPeriodEndDate?: Date
  documentNumber?: string
  minPrice?: number
  maxPrice?: number
  paymentType?: string
  startPaymentDate?: Date
  endPaymentDate?: Date
  counterpartyName?: string
  counterpartyBulstat?: string
  descriptionType?: string
  description?: string
  employee?: string
}
