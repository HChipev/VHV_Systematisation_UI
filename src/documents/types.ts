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

export type ScannedDocumentsResponse = ScannedDocument[]

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
}

export interface SavedDocumentRequest {
  issuedDate: string
  fileNameDescription: string
  documentTypeId: number
  expenseTypeId: number
  vehicleId?: number
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

export type SavedDocumentsResponse = SavedDocument[]

export interface ResourceType {
  id: number
  name: string
  description: string
}

export type ResourceTypeResponse = ResourceType[]
