// TYPES & CONSTANTS
import { GridSortDirection } from '@mui/x-data-grid'
import { PaginationRequest, Roles } from 'src/shared/types'

export enum AdminTabs {
  Users = 'Users',
  DocumentTypes = 'DocumentTypes',
  ExpenseTypes = 'ExpenseTypes',
  Vehicles = 'Vehicles',
  Offices = 'Offices',
  DescriptionTypes = 'DescriptionTypes',
  PaymentTypes = 'PaymentTypes',
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
