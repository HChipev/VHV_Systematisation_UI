// TYPES & CONSTANTS
import { GridSortDirection } from '@mui/x-data-grid'
import { PaginationRequest, Roles } from 'src/shared/types'

export enum AdminTabs {
  Users = 'Users',
  DocumentTypes = 'DocumentTypes',
  ExpenseTypes = 'ExpenseTypes',
  Vehicles = 'Vehicles',
  Offices = 'Offices',
  Personnel = 'Personnel',
  DescriptionTypes = 'DescriptionTypes',
  PaymentTypes = 'PaymentTypes',
  ScanPath = 'ScanPath',
}

export interface UserRequestQuery extends PaginationRequest {
  sortBy?: string
  sortDirection?: GridSortDirection
  email?: string
  roles?: Roles[]
  startCreatedDateTime?: Date
  endCreatedDateTime?: Date
}

export interface UserFilters {
  sortBy?: string
  sortDirection?: GridSortDirection
  email?: string
  roles?: Roles[]
  startCreatedDateTime?: Date
  endCreatedDateTime?: Date
}

export interface ScanPath {
  path: string
}
