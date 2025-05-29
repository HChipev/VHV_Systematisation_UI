// TYPES & CONSTANTS
import { Roles } from 'src/shared/types'

export interface AddUserRequest {
  email: string
  roles: Roles[]
  password: string
  userName: string
}

export interface UpdateUserRequest {
  roles?: Roles[]
  password?: string
  userName?: string
}
