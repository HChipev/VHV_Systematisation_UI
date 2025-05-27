export interface Role {
  name: string
}

export enum Roles {
  Admin = 'Admin',
  User = 'User',
}

export interface ApiError {
  message: string
}

export interface PaginatedResponse<T, U> {
  items: T[]
  metadata: U
}

export interface PaginationMetadataBase {
  count: number
  page: number
  pageSize: number
}

export interface PaginationRequest {
  page: number
  pageSize: number
}

export interface User {
  id: number
  roles: Roles[]
  email: string
  createdDateTime: Date
}
