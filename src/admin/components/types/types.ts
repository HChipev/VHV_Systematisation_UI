// TYPES & CONSTANTS
import { GridSortDirection } from '@mui/x-data-grid'
import { PaginationRequest } from 'src/shared/types'

export interface ResourceTypeRequestQuery extends PaginationRequest {
  sortBy?: string
  sortDirection?: GridSortDirection
}
